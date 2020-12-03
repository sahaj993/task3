const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "954285112769-fahinmgtjr360j7pm1fto5j6elkq7q8b.apps.googleusercontent.com",
    clientSecret: "JyB3gXBXCIXpI3AsBwz8smIr",
    callbackURL: "http://localhost:9000/auth/google/callback",
},
function(accessToken, refreshToken, profile, done){
    // matching the profile with the top most email in case of multiple emails
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error', err); return;}
        if (user){
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                // random password generation
                password: crypto.randomBytes(15).toString('hex')
            }, function(err, user){
                if (err){console.log('error', err); return;}
                return done(null, user);
            })
        }
    })
}

));


passport.serializeUser(function(user, done){
    done(null, user.id);
})


passport.deserializeUser(function(id, done){
    done(null, user);
});

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;

