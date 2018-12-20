const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb://localhost/muber',{ useNewUrlParser:
true });
}
app.use(bodyParser.json());
routes(app);

module.exports = app;