const passport=require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//crypto for generating random password
const crypto=require('crypto');
const User= require('../models/user_schema');

//we will take client id and cle=ient secret by creating credential on google
passport.use(new googleStrategy({
        clientID: "897212509624-ri28u4qidr6dv2v5iphkpessf21h2ujo.apps.googleusercontent.com",
        clientSecret: "Ll6km8wc63Q98DMdu040GC7o",
        callbackURL: "http://localhost:8000/user/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        //here we find the user using gmail
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }

            console.log(profile);
            //if user available in our database then we only login user usinf google
            if(user){
                return done(null,user);
            }else{
                //otherwise we create the user using random password and login by google
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    //here we create random password using crypto
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log("error in creating user using  google strtaegy",err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports=passport;