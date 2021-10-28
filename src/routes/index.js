const userRouter = require('./user');
const accountRouter = require('./account')
const bannerRouter = require('./banner')
const productRouter = require('./product')
const categoryRouter = require('./category')
const advertisementRouter = require('./advertisement')

function route(app) {
    app.use('/user', userRouter);
    app.use('/account', accountRouter);
    app.use('/banner',bannerRouter );
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/advertisement', advertisementRouter);
}

module.exports = route;