const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD,
    }
});

module.exports.sendValidationEmail = (user) => {
    transporter.sendMail({
        from: `"yOUhood" <${email}>`,
        to: user.email, 
        subject: "Welcome to YOUhood",
        html: ` <h1> Welcome</h1>
                <p> Please click on the following link to activate your account</p>
                <a href="${process.env.APP_HOST}/users/${user.id}/activate">Click me</a>`,
    })
    .then(() => {
        console.log(`email sent to ${user.id}`);
    })
    .catch((error) =>{
        console.error ('error sending mail', error)
    });
}