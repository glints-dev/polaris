'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var jscodeshift = require('jscodeshift/src/Runner');
var chalk = require('chalk');
var isGitClean = require('is-git-clean');
var globby = require('globby');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var jscodeshift__namespace = /*#__PURE__*/_interopNamespace(jscodeshift);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var isGitClean__default = /*#__PURE__*/_interopDefaultLegacy(isGitClean);
var globby__default = /*#__PURE__*/_interopDefaultLegacy(globby);

async function migrate(migration, files, options = {}) {
  const migrationFile = path__default["default"].join(__dirname, `./migrations/${migration}/${migration}.js`);

  try {
    if (!fs__default["default"].existsSync(migrationFile)) {
      throw new Error(`No migration found for ${migration}`);
    }

    if (!files) throw new Error(`No path provided for migration`);

    if (!options.dry) {
      checkGitStatus(options.force);
    }

    const filepaths = globby__default["default"].sync(files, {
      cwd: process.cwd()
    });

    if (filepaths.length === 0) {
      throw new Error(`No files found for ${files}`);
    } // eslint-disable-next-line no-console


    console.log(chalk__default["default"].green('Running migration:'), migration);
    await jscodeshift__namespace.run(migrationFile, filepaths, {
      babel: true,
      ignorePattern: ['**/node_modules/**', '**/.next/**', '**/build/**'],
      extensions: 'tsx,ts,jsx,js',
      parser: 'tsx',
      verbose: 2,
      runInBand: true,
      silent: false,
      stdin: false,
      ...options
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
function checkGitStatus(force) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';

  try {
    clean = isGitClean__default["default"].sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    /* eslint-disable no-console */
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using @shopify/polaris-migrator!');
      console.log(chalk__default["default"].yellow('\nBut before we continue, please stash or commit your git changes.'));
      console.log('\nYou may use the --force flag to override this safety check.');
      process.exit(1);
    }
    /* eslint-enable no-console */

  }
}

exports.checkGitStatus = checkGitStatus;
exports.migrate = migrate;
