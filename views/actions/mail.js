const nodemailer = require('nodemailer')
const { user, token } = require('./../../config.json')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: token
    }
});

const sendMail = (email, subject, text, callback) => {

    var mailOptions = {
        from: email,
        to: user,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(`Error sending mail. ${err}`)
            callback(err, null)
        } else {
            console.log('Message sent.')
            callback(null, data)
        }
    })
}

module.exports = sendMail;
