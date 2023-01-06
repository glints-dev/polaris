'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const createCLIConfig = config => config;

const cliConfig = createCLIConfig({
  description: 'Code migrations for updating Polaris apps.',
  args: [{
    name: 'migration',
    description: 'One of the choices from https://polaris.shopify.com/docs/advanced-features/migrations'
  }, {
    name: 'path',
    description: 'Files or directory to transform. Can be a glob like src/**.scss'
  }],
  flags: {
    dry: {
      alias: 'd',
      description: 'Dry run (no changes are made to files)',
      type: 'boolean'
    },
    print: {
      alias: 'p',
      description: 'Print transformed files to your terminal',
      type: 'boolean'
    },
    force: {
      alias: 'f',
      description: 'Bypass Git safety checks and forcibly run migrations',
      type: 'boolean'
    }
  }
});
const POLARIS_MIGRATOR_COMMENT = 'polaris-migrator: Unable to migrate the following expression. Please upgrade manually.';

exports.POLARIS_MIGRATOR_COMMENT = POLARIS_MIGRATOR_COMMENT;
exports.cliConfig = cliConfig;
