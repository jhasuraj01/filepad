const path = require('path');

module.exports = {
  entry: './scripts/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'scripts'),
  },
};