const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

//here is the tranporter in ehich we place port and user email password by which we sent mail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'peeyushmamodia17',
        pass: 'peeyush4769'
    }
});

//for rendering the html content
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template'); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}