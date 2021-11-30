const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const mail = require('../modules/mail');
const router = express.Router();
const db = require('./../modules/dbConnection');
const uplaod = require('./../modules/upload')
const cred = require('./../modules/credential');
const path = require('path');
const { log } = require('console');

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
    db.connection.promise().query("SELECT id FROM `institute` WHERE email=?;", userData.email)
        .then(data => {
            // user email already exists
            if (data[0].length) {
                console.log(`user ${userData.email} already in database::`);
                return res.send('user already exists')
            }

            // save user data in database
            db.connection.promise().query("INSERT INTO `institute` SET ?;", userData)
                .then(user => {
                    console.log('user inserted in registration table', userData.email, '//', user);
                    // generate otp and save into database
                    let otp = cred.genOtp();
                    let verificationLink = `${req.protocol}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/college/verify/${userData.email}/?code=${otp}`

                    // save otp in otp table
                    db.connection.promise().query("INSERT INTO `otp` SET ?", { otp, user_id: user[0].insertId })
                        .then(async () => {
                            console.log('otp inserted in otp table for user', userData.email)

                            // read mailing template for registration
                            let html = await ejs.renderFile(path.join(__dirname, '..', 'views', 'Mail', 'registration.ejs'), { verificationLink, email: userData.email });

                            // send user email for verification
                            let mailOption = {
                                subject: "Verify your UPIRF account",
                                to: userData.email,
                                from: process.env.MAILING_ID,
                                html
                            }
                            mail.sendMail(mailOption)
                                .then(() => {
                                    console.log('verification mail sent to :', mailOption.to);
                                    return res.render("College/verification"); // template required
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.send("something gone wrong");
                                })

                        })

                })

        }).catch(err => console.log('an error occured', err))
});

router.get('/verify/:email', async function (req, res) {
    let email = req.params.email;
    let pass = req.query.code;
    let durationAllowed = 5;  // link expires after 5 min
    db.connection.promise().query(`select otp from otp where user_id=(select id from institute where email=? LIMIT  1) and time > now() - INTERVAL ${durationAllowed} MINUTE ORDER BY id DESC LIMIT 1;`, email)
        .then((result) => {

            if (result[0][0].otp == pass)
                console.log('account verified succefully')
        })
        // generate user password after user verification
        .then(() => {
            let password = cred.genPassword();
            let passHash = cred.genHash(password);

            // acount verified and set password to set acount active
            db.connection.promise().query('UPDATE institute SET password=? WHERE email=?;', [passHash, email]).then(() => {
                console.log('account verified succefully proceed to login')
            }).then(async () => {
                // read mailing template to send credentials back to user
                let html = await ejs.renderFile(path.join(__dirname, '..', 'views', 'Mail', 'credential.ejs'), { email, pass: password });

                // send user email with credentials
                let mailOption = {
                    subject: "Account Activated Succefully",
                    to: email,
                    from: process.env.MAILING_ID,
                    html
                }
                mail.sendMail(mailOption)
                    .then(() => {
                        console.log('credentials sent to :', email);
                        return res.redirect("/college/login"); // template required
                    })
                    .catch(err => {
                        console.log(err);
                        return res.send("something gone wrong");
                    })
            })
        })
        .catch(err => {
            console.log('something goes wrong', err)

            res.render('view/error');
        })
})

router.post('/login', async function (req, res) {
    let userId = req.body.userEmail;
    let password = req.body.password;
    let hashPass = cred.genHash(password)

    await db.connection.promise().query("SELECT `password` FROM `institute` WHERE `user_id`=? LIMIT BY 1", userId, (err, result) => {
        if (err)
            console.log(err);

        if (result[0].password == hashPass)
            return res.render("College/dashboard");
    })
    return res.render("College/login");
});



// dashboard
router.get('/dashboard', function (req, res) {
    res.render("College/dashboard");
});


module.exports = router;
