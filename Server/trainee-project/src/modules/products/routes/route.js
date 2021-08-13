'use strict';
var controller = require('../controllers/controller'),
    mq = require('../../core/controllers/rabbitmq'),
    policy = require('../policy/policy');
module.exports = function (app) {

    app.route('/api/products/search')
        .get(controller.search);

    var url = '/api/products';
    var urlWithParam = '/api/products/:productsId';
    app.route(url)//.all(policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam)//.all(policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param('productsId', controller.getByID);

}