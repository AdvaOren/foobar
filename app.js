const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/baseRouter');
mongoose.connect('mongodb://localhost:27017/test_database', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(8080);