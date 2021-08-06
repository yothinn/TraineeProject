'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Datetime = mongoose.model('Datetime');

var credentials,
    token,
    mockup;

describe('Datetime CRUD routes tests', () => {

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

    it('should be Datetime get use token', (done)=>{
        request(app)
        .get('/api/datetimes')
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

    it('should be Datetime get by id', (done) => {

        request(app)
            .post('/api/datetimes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/datetimes/' + resp.data._id)
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

    it('should be Datetime post use token', (done) => {
        request(app)
            .post('/api/datetimes')
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

    it('should be datetime put use token',  (done) => {

        request(app)
            .post('/api/datetimes')
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
                    .put('/api/datetimes/' + resp.data._id)
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

    it('should be datetime delete use token', (done) => {

        request(app)
            .post('/api/datetimes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/datetimes/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be datetime get not use token', (done) => {
        request(app)
        .get('/api/datetimes')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be datetime post not use token', (done) => {

        request(app)
            .post('/api/datetimes')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be datetime put not use token', (done) => {

        request(app)
            .post('/api/datetimes')
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
                    .put('/api/datetimes/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be datetime delete not use token', (done) => {

        request(app)
            .post('/api/datetimes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/datetimes/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach((done) => {
        Datetime.deleteMany().exec(done);
    });

});