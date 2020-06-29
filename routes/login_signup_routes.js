const express=require('express');

const router = express.Router();
const passport=require('passport');

const userController=require('../controllers/login_signup_controller');

//here it will take to the login, signup, forgot page
router.get('/signup',userController.signup);
router.get('/login',userController.login);
router.get('/forgot',userController.forgot);

//after submit the email it will generate the accesstoken
router.post('/forgotPassword',userController.forgotPassword);

//it will render the reset page where user fill emai
router.get('/userpasswordForgot/:token',userController.renderResetPage);

//router for when password will successfully change using reset link mail
router.post('/passwordForgot/:token',userController.forgotSuccess);

//it wiil redirect to the reset page
router.get('/reset',passport.checkAuthentication,userController.resetPage);
router.get('/profile',passport.checkAuthentication,userController.profile);

//router for creating user
router.post('/create',userController.create);

//it is route for normal password update when user login
router.post('/passwordReset',passport.checkAuthentication,userController.resetPassword);

//router for login using passport local
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/login'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);

//router for the google aauthentication
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/user/login'}),userController.createSession);

module.exports=router;