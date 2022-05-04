const catRouter = require('./category');
const sizeRouter = require('./size');
const colorRouter = require('./color');
const productRouter = require('./product');
const userRouter = require('./user');
const orderRouter = require('./order');
const configRouter = require('./config');
const topicRouter = require('./topic');
const postRouter = require('./post');
const imageRouter = require('./image');
const contactRouter = require('./contact');
const pageRouter = require('./page');
// const testRouter = require('./test');

function router(app) {
    app.use('/api/category', catRouter);
    app.use('/api/size', sizeRouter);
    app.use('/api/color', colorRouter);
    app.use('/api/product', productRouter);
    app.use('/api/user', userRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/config', configRouter);
    app.use('/api/topic', topicRouter);
    app.use('/api/post', postRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/page', pageRouter);
    // app.use('/api/test', testRouter);
}

module.exports = router;
