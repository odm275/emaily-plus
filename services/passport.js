const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //Take user idenity and translate to cookie
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //Take cookie and translate to user identity
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        async (acessToken, refreshToken, profile, done) => {
           const existingUser =  await User.findOne({ googleId: profile.id })//find googleid, will or willnot exist
                    if (existingUser){
                        //  we already have a record with the given profile ID
                       return done(null,existingUser);
                    } 
                    const user =  await new User({ googleId: profile.id}).save();
                    done(null,user);
            }
        )  
);


