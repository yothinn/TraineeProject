'use strict';
const express = require('express');
const app = require('./src/config/app');

app.use(express.static(__dirname));


app.listen(process.env.PORT || 3000, function () {
    console.log('Start server');
    console.log('Service is running');
});