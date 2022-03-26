const { mongooseToObject } = require('../util/mongoose');


class ConfigController {

    // [POST] /store
    paypal(req, res, next) {
        res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
    }

}

module.exports = new ConfigController();