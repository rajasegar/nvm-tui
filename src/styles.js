module.exports = function (colors) {
  return {
    program: {
      bg: colors.primary.background,
      fg: colors.primary.foreground,
    },
    logo: {
      style: {
        fg: colors.normal.red,
        bg: colors.primary.background,
        bold: false,
        border: {
          fg: colors.primary.foreground,
          bg: colors.primary.background,
        },
      },
    },
    info: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        label: {
          bg: colors.primary.background,
          fg: colors.normal.yellow,
        },
      },
      border: {
        type: 'line',
        fg: colors.normal.yellow,
        bg: colors.primary.background,
      },
    },
    lsBox: {
      border: {
        type: 'line',
        fg: colors.primary.foreground,
        bg: colors.primary.background,
      },
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        selected: {
          fg: colors.primary.background,
          bg: colors.normal.yellow,
          label: {
            bg: colors.primary.background,
            fg: 'yellow',
          },
        },
        focus: {
          border: {
            fg: colors.normal.blue,
          },
        },
        label: {
          bg: colors.primary.background,
          fg: colors.normal.yellow,
        },
      },
    },
    selectVersions: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        selected: {
          fg: colors.primary.background,
          bg: colors.primary.foreground,
        },
        label: {
          bg: colors.primary.background,
          fg: colors.normal.yellow,
        },
      },
      border: {
        type: 'line',
        fg: colors.primary.foreground,
        bg: colors.primary.background,
      },
    },
    footer: {
      style: {
        selected: {
          bg: colors.normal.magenta,
          fg: colors.primary.background,
        },
      },
      border: {
        type: 'line',
        fg: colors.normal.green,
        bg: colors.primary.background,
      },
    },
    terminal: {
      border: {
        type: 'line',
        fg: colors.primary.foreground,
        bg: colors.primary.background,
      },

      style: {
        bg: colors.primary.background,
        focus: {
          border: {
            fg: colors.normal.blue,
          },
        },
        label: {
          bg: colors.primary.background,
          fg: colors.normal.yellow,
        },
      },
    },
    prompt: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        border: {
          type: 'line',
          bg: colors.primary.background,
          fg: colors.normal.blue,
        },
        okay: {
          bg: colors.normal.green,
          fg: colors.normal.black,
        },
        cancel: {
          bg: colors.normal.red,
          fg: colors.normal.black,
        },

        input: {
          bg: colors.primary.background,
          fg: colors.primary.foreground,
          border: {
            type: 'line',
            bg: colors.primary.background,
            fg: colors.primary.foreground,
          },
        },
      },
    },
    confirmDialog: {
      style: {
        bg: colors.primary.background,
        fg: colors.primary.foreground,
        border: {
          type: 'line',
          bg: colors.primary.background,
          fg: colors.normal.blue,
        },
        okay: {
          bg: colors.normal.green,
          fg: colors.normal.black,
        },
        cancel: {
          bg: colors.normal.red,
          fg: colors.normal.black,
        },

        input: {
          bg: colors.primary.background,
          fg: colors.primary.foreground,
          border: {
            type: 'line',
            bg: colors.primary.background,
            fg: colors.primary.foreground,
          },
        },
      },
    },
  };
};
