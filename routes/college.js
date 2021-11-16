const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const mail = require('../modules/mail');
const router = express.Router();
const db = require('./../modules/dbConnection');
const uplaod = require('./../modules/upload')
const cred = require('./../modules/credential');
const path = require('path');

// college login
router.get('/login', function (req, res) {
    res.render("College/login");
});

// college forgot Password
router.get('/forgot-password', function (req, res) {
    res.render("College/forgot_password");
});

// college enter OTP
router.get('/enter-otp', function (req, res) {
    res.render("College/enter_otp");
});

// college register
router.get('/register', function (req, res) {
    res.render("College/register");
});

// accept user data from register page
router.post('/register', uplaod.single('collegeCertificate'), function (req, res) {
    let userData = {
        aktu_id: req.body.aktuId,
        name: req.body.collegeName,
        email: req.body.collegeEmail,
        type: req.body.collegeType,
        certificate: req.file.filename,
    };

    // save user data in database
    db.connection.query("INSERT INTO `institute` SET ?", userData, (err, user) => {
        if (err) throw err;
        console.log(user,);

        // generate otp and save into database
        let otp = cred.genOtp();
        db.connection.query("INSERT INTO `otp` SET ?", { otp, user_id: user.insertId }, async (err) => {
            if (err) throw err;
            let html = await ejs.renderFile(path.join(__dirname, '../', 'views/Mail/registration.ejs'), { otp, email: userData.email });

            // send user email for verification
            let mailOption = {
                subject: "Verify your UPIRF account",
                to: userData.email,
                from: process.env.MAILING_ID,
                html
            }
            mail.sendMail(mailOption)
                .catch(err => {
                    console.log(err);
                    return res.send("something gone wrong");
                })
                .then(() => {
                    console.log(userData);
                    return res.render("College/verification"); // template required

                })
        })
    });
});

// dashboard
router.get('/dashboard', function (req, res) {
    res.render("College/dashboard");
});


module.exports = router;
