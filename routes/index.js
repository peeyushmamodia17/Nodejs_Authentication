const express=require('express');

const router = express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user',require('./login_signup_routes'));
// router.get('/signup',homeController.signup);
// router.get('/login',homeController.login);
module.exports=router;