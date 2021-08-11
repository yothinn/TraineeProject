'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Datetimeout = mongoose.model('Datetimeout');

var credentials,
    token,
    mockup;

describe('Datetimeout CRUD routes tests', () => {

    before((done) => {
        mockup = {
            name: 'name'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Datetimeout get use token', (done)=>{
        request(app)
        .get('/api/datetimeouts')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Datetimeout get by id', (done) => {

        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/datetimeouts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        done();
                    });
            });

    });

    it('should be Datetimeout post use token', (done) => {
        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                done();
            });
    });

    it('should be datetimeout put use token',  (done) => {

        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/datetimeouts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.name, update.name);
                        done();
                    });
            });

    });

    it('should be datetimeout delete use token', (done) => {

        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/datetimeouts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be datetimeout get not use token', (done) => {
        request(app)
        .get('/api/datetimeouts')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be datetimeout post not use token', (done) => {

        request(app)
            .post('/api/datetimeouts')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be datetimeout put not use token', (done) => {

        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/datetimeouts/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be datetimeout delete not use token', (done) => {

        request(app)
            .post('/api/datetimeouts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/datetimeouts/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach((done) => {
        Datetimeout.deleteMany().exec(done);
    });

});