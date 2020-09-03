'use strict';

const blessed = require('blessed');
const path = require('path');
const { exec, execFile } = require('child_process');
const fs = require('fs');
const Terminal = require('./src/widgets/terminal');
const Prompt = require('./src/widgets/prompt');
const Question = require('./src/widgets/question');

const options = require('minimist')(process.argv.slice(2));
const scheme = options.theme || 'Dracula';
const colors = require(`blessed-themes/themes/${scheme}`);
const theme = require('./src/styles')(colors.colors);

module.exports = function () {
  const screen = blessed.screen({
    fullUnicode: true,
  });

  const program = blessed.program();
  program.bg(theme.program.bg);
  program.fg(theme.program.fg);
  const bin = path.join(__dirname, 'bin', 'nvm');

  const logo = blessed.bigtext({
    parent: screen,
    content: 'nvmx',
    shrink: true,
    width: '30%',
    height: '25%',
    border: 'line',
    fch: ' ',
    style: theme.logo.style,
  });

  const info = blessed.box({
    parent: screen,
    label: 'info',
    top: '25%+1',
    left: 0,
    width: '30%',
    height: '25%',
    border: theme.info.border,
    style: theme.info.style,
  });

  const lsBox = blessed.list({
    parent: screen,
    label: 'Installed versions',
    top: '50%+1',
    left: 0,
    width: '30%',
    height: '50%-4',
    border: theme.lsBox.border,
    keys: true,
    vi: true,
    style: theme.lsBox.style,
  });

  const selectVersions = blessed.list({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '25%',
    height: '25%',
    border: theme.selectVersions.border,
    keys: true,
    vi: true,
    style: theme.selectVersions.style,
    hidden: true,
    label: ' Select node version to uninstall: ',
  });

  const prompt = Prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
    style: theme.prompt.style,
  });

  prompt._.okay.bg = 'white';

  const confirmDialog = Question({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
    style: theme.confirmDialog.style,
  });

  const footer = blessed.listbar({
    parent: screen,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'shrink',
    mouse: true,
    keys: true,
    border: theme.footer.border,
    vi: true,
    style: theme.footer.style,
    commands: {
      'list-remote': {
        keys: ['l'],
        callback: function () {
          terminal.pty.write('nvm list-remote\r\n');
        },
      },
      install: {
        keys: ['i'],
        callback: function () {
          screen.append(prompt);
          prompt.input(`nvm install :`, '', function (err, value) {
            if (err) return;
            if (value) {
              terminal.pty.write(`nvm install ${value}\r`);
            } else return;
          });
        },
      },
      delete: {
        keys: ['d'],
        callback: function () {
          selectVersions.hidden = false;
          selectVersions.setItems(installedVersions);
          screen.append(selectVersions);
          screen.render();
          selectVersions.focus();

          selectVersions.on('select', (node) => {
            screen.append(confirmDialog);
            confirmDialog.ask(
              'Are you sure want to delete the selected node version?',
              (err, value) => {
                //console.log(value);
                if (value) {
                  const { content } = node;
                  selectVersions.detach();
                  terminal.pty.write(`nvm uninstall ${content}\r\n`);
                }
              }
            );
          });

          selectVersions.key('escape', () => {
            selectVersions.detach();
            lsBox.focus();
            screen.render();
          });
        },
      },
      quit: {
        keys: ['q'],
        callback: function () {},
      },
    },
  });

  lsBox.on('select', (node) => {
    const { content } = node;
    terminal.pty.write(`nvm use ${content}\r\n`);
    versions.current = content;
    updateInfo();
  });

  const terminal = Terminal({
    parent: screen,
    top: 0,
    left: '30%+1',
    width: '70%',
    height: '100%-3',
    border: theme.terminal.border,
    label: 'Terminal',
    fullUnicode: true,
    screenKeys: false,
    style: theme.terminal.style,
  });
  screen.append(terminal);
  screen.render();

  screen.append(info);
  screen.append(lsBox);

  const versions = {
    node: '',
    npm: '',
    nvm: '',
  };

  function updateInfo() {
    const _infoContent = `
  node: ${versions.node}
  npm: ${versions.npm}
  nvm: ${versions.nvm}
  current: ${versions.current}
  `;

    info.setContent(_infoContent);

    screen.render();
  }

  exec('node -v', (err, stdout) => {
    versions.node = stdout;
    updateInfo();
  });

  exec('npm -v', (err, stdout) => {
    versions.npm = stdout;
    updateInfo();
  });

  execFile(bin, ['--version'], (err, stdout) => {
    versions.nvm = stdout;
    updateInfo();
  });

  execFile(bin, ['current'], (err, stdout) => {
    versions.current = stdout;
    updateInfo();
  });

  const installedVersions = fs.readdirSync(
    `${process.env.NVM_DIR}/versions/node`
  );
  lsBox.setItems(installedVersions);

  screen.key('q', () => {
    //return screen.destroy();

    process.exit(0);  // eslint-disable-line
  });

  lsBox.focus();

  lsBox.key('tab', () => {
    terminal.focus();
  });
  terminal.key('tab', () => {
    lsBox.focus();
  });

  screen.append(logo);
  screen.append(footer);
  screen.render();
};
