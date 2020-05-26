const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const app = express();
const routesPosts = require('./routes/routesPosts');
const routesUsers = require('./routes/routesUsers');
//const path = require('path');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/posts', routesPosts);
app.use('/api/auth', routesUsers);
//app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;