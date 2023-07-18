const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const authController = require('../controllers/auth');
const {ensureLoggedInApi} = require('../middleware/auth')
const passport = require('passport');
let multer = require('multer');
let upload = multer();

router.post('/login/password',
	upload.fields([]),
	passport.authenticate('local'),
	asyncHandler(authController.login));

router.post('/login/token', 
	upload.fields([]),
	passport.authenticate('bearer',{session:false}), 
	asyncHandler(authController.login));

router.post('/logout', asyncHandler(authController.logout));
router.post('/register', 
	upload.fields([]),
	asyncHandler(authController.register));

router.post('/password-reset', 
	ensureLoggedInApi,
	upload.fields([]),
	asyncHandler(authController.resetPassword))

module.exports = router;
