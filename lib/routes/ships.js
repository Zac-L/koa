const Router = require('koa-router');
const router = new Router();
const Ship  = require('../models/ship');

module.exports = router

    .post('/', (ctx, next) => {
        new Ship(ctx.req.body)
            .save()
            .then(mongoRes => {
                ctx.res.send(mongoRes);
            })
            .catch(next);
    })

    .get('/', (ctx, next) => {
        Ship.find({})
            .lean()
            .then(mongoRes => ctx.response(mongoRes))
            .catch(next);
    })

    .get('/:id', (ctx, next) => {
        Ship.findById(ctx.req.params.id)
            .lean()
            .then(mongoRes => {
                if(!mongoRes) {
                    ctx.res.statusCode = 404;
                    ctx.res.send(`id: ${ctx.req.params.id} does not exist`);
                }
                else ctx.res.json(mongoRes);
            })
            .catch(next);
    })

    .put('/:id', (ctx, next) => {
        const id = ctx.req.params.id;
        if (!id) {
            next({ code: 404, error: `id ${id} does not exist` });
        }
        Ship.update({ _id: id }, ctx.req.body, (err, data) => ctx.res.send(data));
    })

    .delete('/:id', (ctx, next) => {
        Ship.findByIdAndRemove(ctx.req.params.id)
            .then(result => {
                const exist = result !=null;
                ctx.res.json({ removed: exist });
            })
            .catch(next);
    })

    .patch('/:id', (ctx, next) => {
        Ship.findByIdAndUpdate(
            ctx.req.params.id,
            { $set: ctx.req.body },
            { new: true }
        )
            .lean()
            .then(mongoRes => ctx.res.send(mongoRes))
            .catch(next);
    });