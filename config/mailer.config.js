const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD,
    }
});

module.exports.sendWelcomeEmail = (user, password) => {
    transporter.sendMail({
        from: `"yOUhood" <${email}>`,
        to: user.email, 
        subject: "Welcome to YOUhood",
        html: ` <h1> Welcome</h1>
                <p> Welcome to youhood, please click on the following link to access the page</p>
                <a href="${process.env.APP_HOST}/login">Click me</a>
                your email is ${user.email} and password is ${password}`,
    })
    .then(() => {
        console.log(`email sent to ${user.id}`);
    })
    .catch((error) =>{
        console.error ('error sending mail', error)
    });
}