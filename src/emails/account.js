const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "info@kata-do.com",
        subject: "Welcome do the Kata-do App",
        text: `Welcome to the app, ${name}. Let us know if you like the app`
    })
}


const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "info@kata-do.com",
        subject: "Kata-do Cancelation Request",
        text: `Hello ${name}. We are sorry to see you going. Please let us know what could we do, to improve the app.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}