const express=require('express');

//use cookie parser for set cookie
const cookieParser=require('cookie-parser');
const path=require('path');
const app=express();
const port=8000;

//here we use ejs layout
const expressLayouts=require('express-ejs-layouts');

//here we use mongoose
const db=require('./config/mongoose');
const session=require('express-session');

//here we export the passport
const passport=require('passport');

//here we export the passport local and passport google oauth
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle= require('./config/passport-google-oauth');
const bodyparser=require('body-parser');

//bcrypt for decrypt the password
const bcrypt= require('bcrypt');

//connect mongo for saving the cookie in database 
const MongoStore=require('connect-mongo')(session);

//saaa middleware for desgining the frontent using scss it convert scss in css.
const sassMiddleware=require('node-sass-middleware');

//connect flash for showing the notification
const flash=require('connect-flash');
const middleware=require('./config/middleware');

//here we set the sassmiddleware
app.use(sassMiddleware({
    src : './assets/scss',
    dest :'./assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('assets'));

//here we use layout for redirect all page on one page
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//here we use ejs for writing the html code
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//here is the mongo session for saving the cookie in db
app.use(session({
    name:'codieal',
    //todo change the secret before deployment
    secret:'peeyush',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
        
            mongooseConnection :db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//here is flash for showing the flash notification
app.use(flash());
app.use(middleware.setFlash);

app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log("error in running the server on port");
    }

    console.log("Server successfully running on port",port);
})

