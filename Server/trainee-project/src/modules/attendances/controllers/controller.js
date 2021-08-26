'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Attendances = mongoose.model('Attendances'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');
    const config = require('../../../config/config');
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
            Attendances.find(req.query)
                .skip(size * (pageNo))
                .limit(size)
                .sort(sort)
                .exec(),
            Attendances.countDocuments(req.query).exec()
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

exports.create = (req, res) => {
    var newAttendances = new Attendances(req.body);
    newAttendances.createby = req.user;
    newAttendances.save((err, data) => {
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

exports.getByID = (req, res, next, id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Attendances.findById(id, (err, data) => {
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

exports.update = (req, res) => {
    var updAttendances = _.extend(req.data, req.body);
    updAttendances.updated = new Date();
    updAttendances.updateby = req.user;
    updAttendances.save((err, data) => {
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


exports.search = function (req, res) {
    let searchText = req.query.query;
    let query = {

        $or: [
            { name: { $regex: `^${searchText}`, $options: "i" } },
            { lastname: { $regex: `^${searchText}`, $options: "i" } }
        ]
    };
    console.log(query);

    Attendances.find(query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // console.log(datas);
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });

}

exports.uploads = (req, res) => {
    const url = req.protocol + '://' + req.headers.host + '/src/modules/attendances/' + config.folderName + '/';
    req.file.url = url + req.file.filename;
    console.log(url)   
    res.jsonp({
        data: req.file
    });
}
