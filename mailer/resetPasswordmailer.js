const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPassword = (user,token) => {
    //this the message body for mail
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: user.email,
       subject: 'Node.js Password Reset',
       text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + 'localhost:8000' + '/user/userpasswordForgot/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('success','An e-mail has been sent to with further instructions.');
        return;
    });
}