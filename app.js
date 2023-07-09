const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config/config')
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/blog-file', express.static(__dirname + '/public/blog-file'));
app.use('/image-file', express.static(__dirname + 'public/image-file'));

async function connectToDatabase() {
    try {
      await mongoose.connect(config.db.mongoUri);
      console.log('Connected to the database!');
    } catch (err) {
      console.error('Connection failed!');
      console.error(err);
    }
}

connectToDatabase()

app.use('/api', apiRouter);

module.exports = app;
