'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Datetimeout = mongoose.model('Datetimeout'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

exports.getList = async (req, res) => {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);

    delete req.query.pageNo;
    delete req.query.size;

    var sort = { updated: -1, created: -1 };

    if (pageNo < 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }

    try {
        const [_result, _count] = await Promise.all([
            Datetimeout.find(req.query)
                .skip(size * (pageNo))
                .limit(size)
                .sort(sort)
                .exec(),
                Datetimeout.countDocuments(req.query).exec()
        ]);

        res.jsonp({
            status: 200,
            data: _result,
            pageIndex: pageNo,
            pageSize: size,
            totalRecord: _count,
        });

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            message: errorHandler.getErrorMessage(err)
        });
    }
};

exports.create =  (req, res) => {
    var newDatetimeout = new Datetimeout (req.body);
    newDatetimeout.createby = req.user;
    newDatetimeout.save((err, data) => {
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

exports.getByID = (req, res, next, id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Datetimeout.findById(id, (err, data) => {
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

exports.read = (req, res) => {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update =  (req, res) => {
    var updDatetimeout = _.extend(req.data, req.body);
    updDatetimeout.updated = new Date();
    updDatetimeout.updateby = req.user;
    updDatetimeout.save((err, data) => {
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

exports.delete = (req, res) => {
    req.data.remove((err, data) => {
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


