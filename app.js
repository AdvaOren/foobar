const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/baseRouter');
const bf = require('./bloom_filter/socket')
mongoose.connect('mongodb://localhost:27017/test_database', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use('/', router);
await bf.init();
const server = app.listen(8080);
// Set maxHeadersSize
server.maxHeadersSize = 1024 * 1024; // Set the maximum header size in bytes