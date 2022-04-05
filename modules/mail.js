require("dotenv").config();
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;


// create nodemailer transporter equivalent wrapper
const createTransporter = async () => {
    const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // generate access token
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err);
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail", auth: {
            type: "OAuth2",
            user: process.env.MAILING_ID,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }, tls: {
            rejectUnauthorized: false
        }
    });

    return transporter;
};
const emailTransporter = createTransporter();

// send mail wrapper function
const sendMail = async (emailOptions) => {
    try {
        if (!emailTransporter) throw new Error("Transporter not ready");

        const mailResponse = await emailTransporter.sendMail(emailOptions);
        if (!mailResponse) throw new Error("couldn't send mail try again");
    } catch (err) {
        console.log(err);
        throw err;
    }
};


module.exports = {sendMail};