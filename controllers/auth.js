const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const RSA_PRIVATE_KEY = fs.readFileSync('keys/private.pem');

function generateAccessToken(user){
    const jwtBearerToken = jwt.sign({
        id : user.id,
        name: user.username,
        roles : user.roles
    }, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: user.id
    });
    return jwtBearerToken;
}

async function login(req,res,next){
    // Generate and set the access token for the logged-in user
    const accessToken = generateAccessToken(req.user);
    req.user.token = accessToken;
    await req.user.save()
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.json({ token: accessToken, message: 'Login successful' });
}

function logout(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({success: true, message: "Logged Out"}) 
});
}

function register(req, res, next) {
    console.log(req.body)
    const user = new userModel({password: req.body.password,email: req.body.email, username : req.body.username});
    
    userModel.register(user, req.body.password, function(err, user) { 
        if (err) { 
            res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
        }else{ 
            res.json({success: true, message: "Your account has been saved"}) 
        } 
    }); 
}

async function resetPassword(req,res,next){
    const user = req.user;  
    console.log(req.body)
    user.changePassword(req.body.oldPassword,req.body.newPassword)
    user.save()
    res.json({success: true, message: "Your account has been saved"})     
}

async function refreshToken(req,res,next) {

}

module.exports = {
    login,
    logout,
    register,
    resetPassword,
    refreshToken
}