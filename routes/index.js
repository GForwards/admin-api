const users = require('./users.js');

module.exports = function (app) {
    app.use('/user', users);
};
