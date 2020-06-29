const User=require('../models/user_schema');

//it render the home page 
module.exports.home= async function(req,res){

    // Post.find({},function(err,post){
    //     return res.render('Home',{
    //         title:'Home Page',
    //         post:post
    //     });
    // })

    // Post.find({}).populate('user').exec(function(err,post){
    //     return res.render('Home',{
    //         title:'Home Page',
    //         post:post
    //     });
    // })

    try{
        
        let users =await User.find({});
       
        return res.render('Home',{
            title:'Home Page'
        });
    }catch(err){
        console.log('error',err);
        return;
    }

   
}

// module.exports.signup=function(req,res){
//     return res.render('signup',{
//         title: 'Signup Page'
//     });
// }
// module.exports.login=function(req,res){
//     return res.render('login',{
//         title: 'Login Page'
//     });
// }