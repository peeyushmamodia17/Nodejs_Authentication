const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPasswordSuccss = (user) => {
    //this is the message body for mail when password change succcessfully
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: user.email,
       subject: 'Your password has been changed',
       text:  'Hello,\n\n' +
       'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('Message sent', info);
        return;
    });
}