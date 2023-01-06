'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var meow = require('meow');
var migrate = require('./migrate.js');
var constants = require('./constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var meow__default = /*#__PURE__*/_interopDefaultLegacy(meow);

const help = `
Usage
  $ npx @shopify/polaris-migrator ${constants.cliConfig.args.map(arg => `<${arg.name}>`).join(' ')}
  ${constants.cliConfig.args.map(arg => `${arg.name}\t${arg.description}`).join('\n  ')}
Options
  ${Object.entries(constants.cliConfig.flags).map(([name, {
  description
}]) => `--${name}\t${description}`).join('\n  ')}
`;
const {
  input,
  flags
} = meow__default["default"]({
  description: constants.cliConfig.description,
  flags: Object.fromEntries(Object.entries(constants.cliConfig.flags).map(([name, flag]) => [name, {
    alias: flag.alias,
    type: flag.type
  }])),
  help
});
async function run() {
  await migrate.migrate(input[0], input[1], flags);
}

exports.run = run;
