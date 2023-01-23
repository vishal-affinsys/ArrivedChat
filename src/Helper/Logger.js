const color = {
  bold: {},
  normal: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },
};

export const outLog = {
  black: (e, ...args) => {
    console.log(color.normal.black + e, ...args);
  },
  red: (e, ...args) => {
    console.log(color.normal.red + e, ...args);
  },
  green: (e, ...args) => {
    console.log(color.normal.green + e, ...args);
  },
  yellow: (e, ...args) => {
    console.log(color.normal.yellow + e, ...args);
  },
  blue: (e, ...args) => {
    console.log(color.normal.blue + e, ...args);
  },
  magenta: (e, ...args) => {
    console.log(color.normal.magenta + e, ...args);
  },
  cyan: (e, ...args) => {
    console.log(color.normal.cyan + e, ...args);
  },
  white: (e, ...args) => {
    console.log(color.normal.white + e, ...args);
  },
};
