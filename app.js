const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config/config')
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
var passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
var session = require('express-session');
const userModel = require('./models/user');
const { ensureLoggedIn } = require('connect-ensure-login');
const { verify, verifyToken } = require('./middleware/auth')
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// passport auth
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(config.passport));
app.use(passport.initialize());
passport.use(userModel.createStrategy());
passport.use(new BearerStrategy(verifyToken));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use('/blog-file', express.static(__dirname + '/public/blog-file'));
app.use('/image-file', express.static(__dirname + '/public/image-file'));

async function connectToDatabase() {
    try {
      await mongoose.connect(config.db.mongoUri);
      console.log('Connected to the database!');
    } catch (err) {
      console.error('Connection failed!');
      console.error(err);
    }
}

async function createFirstAdminUser(){
  const user = new userModel(config.admin);
    
  userModel.register(user, config.admin.password, function(err, user) { 
      if (err) { 
        if(err.name === 'UserExistsError') {
          console.log("admin exists") 
        }
        else {
          console.log("admin not saved", err) 
        }
      }else{ 
        console.log("admin saved")      
      } 
  }); 
}

connectToDatabase()
createFirstAdminUser()

app.use('/api', apiRouter);
app.use('/auth', authRouter);

module.exports = app;
