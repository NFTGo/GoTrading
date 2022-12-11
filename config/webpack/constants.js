const path = require('path');
const resolve = path.resolve;
const isDev = process.env.NODE_ENV !== 'production';
const VERSION = process.env.VERSION;
const PROJECT_PATH = resolve(__dirname, '../../');

module.exports = {
  PROJECT_PATH,
  resolve,
  isDev,
  VERSION,
};
