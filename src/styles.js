module.exports = function (colors) {
  return {
    program: {
      bg: colors.bg,
      fg: colors.fg,
    },
    logo: {
      style: {
        fg: colors.red,
        bg: colors.bg,
        bold: false,
        border: {
          fg: colors.fg,
          bg: colors.bg,
        },
      },
    },
    info: {
      style: {
        bg: colors.bg,
        fg: colors.fg,
        label: {
          bg: colors.bg,
          fg: 'yellow',
        },
      },
      border: {
        type: 'line',
        fg: colors.green,
        bg: colors.bg,
      },
    },
    lsBox: {
      border: {
        type: 'line',
        fg: colors.fg,
        bg: colors.bg,
      },
      style: {
        bg: colors.bg,
        selected: {
          fg: colors.bg,
          bg: colors.yellow,
          label: {
            bg: colors.bg,
            fg: 'yellow',
          },
        },
        focus: {
          border: {
            fg: colors.blue,
          },
        },
      },
    },
    selectVersions: {
      style: {
        bg: colors.bg,
        selected: {
          fg: colors.bg,
          bg: colors.fg,
        },
      },
      border: {
        type: 'line',
        fg: colors.fg,
        bg: colors.bg,
      },
    },
    footer: {
      style: {
        selected: {
          bg: colors.magenta,
          fg: colors.bg,
        },
      },
      border: {
        type: 'line',
        fg: colors.green,
        bg: colors.bg,
      },
    },
    terminal: {
      border: {
        type: 'line',
        fg: colors.fg,
        bg: colors.bg,
      },

      style: {
        bg: colors.bg,
        focus: {
          border: {
            fg: colors.blue,
          },
        },
      },
    },
    prompt: {
      style: {
        bg: colors.bg,
        fg: colors.fg,
        border: {
          type: 'line',
          bg: colors.bg,
          fg: colors.blue,
        },
        okay: {
          bg: colors.green,
          fg: colors.black,
        },
        cancel: {
          bg: colors.red,
          fg: colors.black,
        },

        input: {
          bg: colors.bg,
          fg: colors.fg,
          border: {
            type: 'line',
            bg: colors.bg,
            fg: colors.fg,
          },
        },
      },
    },
    confirmDialog: {
      style: {
        bg: colors.bg,
        fg: colors.fg,
        border: {
          type: 'line',
          bg: colors.bg,
          fg: colors.blue,
        },
        okay: {
          bg: colors.green,
          fg: colors.black,
        },
        cancel: {
          bg: colors.red,
          fg: colors.black,
        },

        input: {
          bg: colors.bg,
          fg: colors.fg,
          border: {
            type: 'line',
            bg: colors.bg,
            fg: colors.fg,
          },
        },
      },
    },
  };
};
