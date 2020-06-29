const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Authentication_db');

const db=mongoose.connection;

// in this when database is not connect it don"t give error
db.on('error',console.error.bind(console,'error connecting to db'));

// when database is connected it give the message 
db.once('open',function(){
    console.log("Successfully connected to database");
});

module.exports=db;