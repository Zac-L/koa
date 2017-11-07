const Router = require('koa-router');
const router = new Router();
const Ship  = require('../models/ship');

module.exports = router

    .get('/', (ctx, next) => {
        Ship.find({})
            .lean()
            .then(mongoRes => ctx.response(mongoRes))
            .catch(next);
    });