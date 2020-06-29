const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    city:{
        type:String,
    },
    Birth_date:{
        type:Date,
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires:{
        type: String
    }
},
    {
        timestamps: true
    }
);

const user=mongoose.model('user',userSchema);


module.exports=user;