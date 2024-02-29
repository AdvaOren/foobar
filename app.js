const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/baseRouter');

mongoose.connect('mongodb://localhost:27017/test_database', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

app.listen(8080);