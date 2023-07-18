const userModel = require('../models/user');
const {ensureLoggedIn} = require('connect-ensure-login');
const passport = require('passport')

function ensureHasRole(role) {
    return async function(req,res,next) {
        if (req.user.roles.map(x=>x.value).includes(role)) {
            next()
        } else {
            res.json({success:false,message:"Unauthorized"}).status(400)
        }        
    }
}

function ensureHasOneOfRoles(roles) {
    return async function(req,res,next) {
        for (role of roles) {
            if (req.user.roles.map(x=>x.value).includes(role)) {
                return next()
            }
        }
        res.json({success:false,message:"Unauthorized"}).status(400)
    }
}

async function ensureLoggedInApi(req, res, next) {
    if (req.headers.authorization) {
      passport.authenticate('bearer', { session: false })(req, res, next);
    } else {
      ensureLoggedIn('/')(req, res, next);
    }
}

async function verifyToken(token, done) {
    try {
        const user = await userModel.findOne({ token: token })
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
    }
    catch (err) { return done(err); }
}

module.exports = {
    ensureHasRole,
    ensureHasOneOfRoles,
    verifyToken,
    ensureLoggedInApi
}