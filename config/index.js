const path = require('path');
const development = require('./env/development');
const production = require('./env/production');
const test = require('./env/test');

const defaults = {
    root: path.join(__dirname, '..'),
};

module.exports = {
    development: Object.assign({}, development, defaults),
    production: Object.assign({}, development, production),
    test: Object.assign({}, test, defaults),
}[process.env.NODE_ENV || 'development'];
