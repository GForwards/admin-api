/**
 * Module dependencies
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const join = path.join;

const config = require('config');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const modlesPath = join(__dirname, 'models');

const dbUrl = config.get('MONGODB_URL');
console.log(dbUrl);
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function listen() {
    if (app.get('env') === 'test') return;
    // app.listen(port);
    console.log('Express app started on port ' + port);
}

module.exports = app;

require('./models/user');
// Bootstrap models
fs.readdirSync(modlesPath)
    .filter((file) => ~file.search(/^[^.].*\.js$/))
    .forEach((file) => require(join(modlesPath, file)));

// Bootstrap routes
require('./routes/index')(app);

// mongodb connect
connect();

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    return mongoose.connect(dbUrl, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
