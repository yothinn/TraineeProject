'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Products = mongoose.model('Products'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');
const config = require('../../../config/config');
const readXlsxFile = require('read-excel-file/node');

exports.getList = function (req, res) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    delete req.query.pageNo;
    delete req.query.size;

    var query = {
    };

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    Products.find(req.query, {}, query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var newProducts = new Products(req.body);
    newProducts.createby = req.user;
    newProducts.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Products.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updProducts = _.extend(req.data, req.body);
    updProducts.updated = new Date();
    updProducts.updateby = req.user;
    updProducts.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.search = function (req, res) {
    let searchText = req.query.query;
    let query = {

        productName: { $regex: `^${searchText}` }
        // $or: [
        //     { productName: { $regex: `^${searchText}`, $options: "i" } }
        //     { lastName: { $regex: `^${searchText}`, $options: "i" } }
        // ]
    };

    Products.find(query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
}

exports.uploads = (req, res) => {
    const url = req.protocol + '://' + req.headers.host + '/src/modules/products/' + config.uploadImageProduct + '/';
    req.file.url = url + req.file.filename;
    res.jsonp({
        data: req.file
    });
}

exports.import = (req, res) => {
    
    readXlsxFile(req.file.path).then((rows) => {
        rows.shift()
        rows.forEach(row => {
                let dataTest = {
                productId:row[0],
                productName:row[1],
                type:row[2],
                price:row[3],
                count:row[4],
                description:row[5]
            };
            console.log(dataTest);
            //  test.push(dataTest)
            var newProducts = new Products(dataTest);
            newProducts.save(function (err, data) {
                 console.log(data);
                //  if (err) {
                //     return res.status(400).send({
                //         status: 400,
                //         message: errorHandler.getErrorMessage(err)
                //     });
                // } else {
                //     res.jsonp({
                //         status: 200,
                //         data: data
                //     });
                   
                // };
                
            });
        });
        // console.log(test)
    })
}




