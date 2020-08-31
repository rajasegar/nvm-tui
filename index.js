'use strict';

const blessed = require('blessed');
const path = require('path');
const { exec, execFile } = require('child_process');
const fs = require('fs');
const Terminal = require('./src/widgets/terminal');

module.exports = function () {
  const screen = blessed.screen({ fullUnicode: true });
  const bin = path.join(__dirname, 'bin', 'nvm');

  const logo = blessed.bigtext({
    parent: screen,
    content: 'nvmx',
    shrink: true,
    width: '30%',
    height: 'shrink',
    //height: '20%',
    border: 'line',
    fch: ' ',
    style: {
      fg: 'white',
      bold: false,
    },
  });

  const info = blessed.box({
    parent: screen,
    label: 'info',
    top: '20%+1',
    left: 0,
    width: '30%',
    height: '30%',
    border: {
      type: 'line',
      fg: 'white',
    },
  });

  const lsBox = blessed.list({
    parent: screen,
    label: 'Installed versions',
    top: '50%+1',
    left: 0,
    width: '30%',
    height: '50%-4',
    border: {
      type: 'line',
      fg: 'white',
    },
    keys: true,
    vi: true,
    style: {
      selected: {
        fg: 'black',
        bg: 'white',
      },
      focus: {
        border: {
          fg: 'yellow',
        },
      },
    },
  });

  const selectVersions = blessed.list({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    border: {
      type: 'line',
      fg: 'white',
    },
    keys: true,
    vi: true,
    style: {
      selected: {
        fg: 'black',
        bg: 'white',
      },
    },
    hidden: true,
  });

  const prompt = blessed.prompt({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
  });

  const footer = blessed.listbar({
    parent: screen,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'shrink',
    mouse: true,
    keys: true,
    border: 'line',
    vi: true,
    style: {
      selected: {
        bg: 'white',
        fg: 'black',
      },
    },
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
            const { content } = node;
            selectVersions.detach();
            terminal.pty.write(`nvm uninstall ${content}\r\n`);
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
    border: {
      type: 'line',
      fg: 'white',
    },
    label: 'Terminal',
    fullUnicode: true,
    screenKeys: false,
    style: {
      focus: {
        border: {
          fg: 'yellow',
        },
      },
    },
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
    return screen.destroy();
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
  screen.append(prompt);
  screen.render();
};
