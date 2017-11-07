const Koa = require('koa');
const app = new Koa();
const api = require('koa-router')();

const morgan = require('morgan');
const bodyParser = require('koa-better-body');
const errorHandler = require('./utils/error-handler');

const ships = require('./routes/ships');

app.use(morgan('dev'));
app.use(bodyParser());

api.use('/api/ships', ships.routes());
app.use(api.routes());




app.use(errorHandler());

module.exports = app;