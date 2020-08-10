const path = require('path')
const mode = /**/"production" || "development"
const outputFolder = path.resolve(__dirname, 'dist/scripts')

module.exports = [
  {
    mode: mode,
    entry: './src/scripts/index.js',
    output: {
      filename: 'index.js',
      path: outputFolder,
    },
  },
  {
    mode: mode,
    entry: './browser_modules/file-handler',
    output: {
      filename: 'file-handler.js',
      path: outputFolder,
    },
  },
  {
    mode: mode,
    entry: './browser_modules/file-handler-classical',
    output: {
      filename: 'file-handler-classical.js',
      path: outputFolder,
    },
  },
  {
    mode: mode,
    entry: './browser_modules/utils.js',
    output: {
      filename: 'utils.js',
      path: outputFolder,
    },
  },
];