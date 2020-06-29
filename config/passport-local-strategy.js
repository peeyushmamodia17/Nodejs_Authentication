const passport = require('passport');
const bcrypt=require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user_schema');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    async function(req,email, password, done){

        try{
            //find user using email
            let user=await User.findOne({email: email});
           
            //compare teh password the using bcrypt compare with user password
            let checkpassword=await bcrypt.compare(password,user.password);
            if (!user || !checkpassword){
                req.flash('error','Invalid username/Password')
                return done(null, false);
            }

            return done(null, user);
        }catch(err){
            if (err){
                req.flash('error',err);
                return done(err);
            }
        }
        
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//we will check the user is login or not
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/login');
}

//here we set the user in locals
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;