'use strict';
var controller = require('../controllers/controller'),
    mq = require('../../core/controllers/rabbitmq'),
    policy = require('../policy/policy');
    const multer = require('multer');
    const config = require('../../../config/config');

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, './src/modules/products/' + config.uploadImageProduct);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = function (app) {

    var url = '/api/products';
    var urlWithParam = '/api/products/:productsId';
    app.route('/api/products/uploads')
        .post(upload.single('files'), controller.uploads);

    app.route('/api/products/search')
        .get(controller.search);

    app.route(url)//.all(policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam)//.all(policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param('productsId', controller.getByID);

}