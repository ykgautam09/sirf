const express = require("express");
const ejs = require("ejs");
const mail = require("../modules/mail");
const router = express.Router();
const db = require("./../modules/dbConnection");
const upload = require("./../modules/upload");
const cred = require("./../modules/credential");
const path = require("path");

// college login
router.get("/login", function (req, res) {
    res.render("College/login");
});

// college forgot Password
router.get("/forgot-password", function (req, res) {
    res.render("College/forgot_password");
});

// college enter OTP
router.get("/enter-otp", function (req, res) {
    res.render("College/enter_otp");
});

// college register
router.get("/register", function (req, res) {
    res.render("College/register");
});

// accept user data from register page
router.post("/register", upload.single("collegeCertificate"), function (req, res) {

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
                return res.send("user already exists");
            }

            // save user data in database
            db.connection.promise().query("INSERT INTO `institute` SET ?;", userData)
            // generate otp and save into database
                .then(user => {

                    console.log("user inserted in registration table", userData.email);
                    let otp = cred.genOtp();
                    // generate verification link
                    let verificationLink = `${req.protocol}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/college/verify/${userData.email}/?code=${otp}`;

                    // save otp in otp table
                    db.connection.promise().query("INSERT INTO `otp` SET ?", { otp, user_id: user[0].insertId })
                        .then(() => {

                            console.log("otp inserted in otp table for user", userData.email);
                            // read mailing template for verification after registration
                            ejs.renderFile(path.join(__dirname, "..", "views", "Mail", "registration.ejs"), { verificationLink, email: userData.email })
                                .then((data) => {

                                    // send user email for verification
                                    let mailOption = {
                                        subject: "Verify your UPIRF account",
                                        to: userData.email,
                                        from: process.env.MAILING_ID,
                                        html: data
                                    };

                                    mail.sendMail(mailOption)
                                        .then(() => {
                                            console.log("verification mail sent to :", mailOption.to);
                                            return res.render("College/login");
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            return res.send("something gone wrong");
                                        });
                                });
                        });
                });
        })
        .catch(err => console.log("an error occurred", err));
});

router.get("/verify/:email", async function (req, res) {
    let email = req.params.email;
    let pass = req.query.code;
    let durationAllowed = 5;  // link expires after 5 min

    // read otp created less than 5 min ago
    db.connection.promise().query(`select otp from otp where user_id=(select id from institute where email=? LIMIT  1) and time > now() - INTERVAL ${durationAllowed} MINUTE ORDER BY id DESC LIMIT 1;`, email)
        .then((result) => {

            let otp = result[0][0].otp;
            if (otp == pass) {
                console.log("account verified successfully");
                // asynchronously delete stored otp once used Successfully
                db.connection.promise().query("DELETE FROM otp WHERE user_id=(SELECT id FROM institute WHERE email=? LIMIT 1) and otp=?;", [email, otp]).then(() => console.log("current otp removed from database for :", email));
            }
        })
    // generate user password after user verification
        .then(() => {

            let password = cred.genPassword();
            let passHash = cred.genHash(password);

            // account verified and set password to set account active
            db.connection.promise().query("UPDATE institute SET password=? WHERE email=?;", [passHash, email]).then(() => {
                console.log("account verified successfully proceed to login");
            }).then(() => {

                // read mailing template to send credentials back to user
                ejs.renderFile(path.join(__dirname, "..", "views", "Mail", "credential.ejs"), { email, pass: password })
                    .then((content) => {

                        // send user email with credentials
                        let mailOption = {
                            subject: "Account Activated Successfully",
                            to: email,
                            from: process.env.MAILING_ID,
                            html: content
                        };

                        mail.sendMail(mailOption)
                            .then(() => {
                                console.log("credentials sent to :", email);
                                return res.redirect("/college/login"); // template required
                            })
                            .catch(err => {
                                console.log(err);
                                return res.send("something gone wrong");
                            });
                    });

            })
                .catch(() => {
                    console.log("password couldn't be set in database");
                    res.render("Error/500");
                });
        })
        .catch(err => {
            console.log("link doesn't matched with database", err);
            res.send("Either link is already used or it is expired");
        });
});

router.post("/login", function (req, res) {
    let email = req.body.userEmail;
    let password = req.body.password;

    db.connection.promise().query("SELECT `password` FROM `institute` WHERE `email`=? LIMIT 1", email)
        .then(async result => {

            let hash = result[0][0].password;
            if (cred.compareHash(password, hash)) {
                console.log("login successfully");

                // read mailing template to send login notification
                ejs.renderFile(path.join(__dirname, "..", "views", "Mail", "login.ejs"), { email, pass: password })
                    .then((content) => {

                        // send user email with login details
                        let mailOption = {
                            subject: "Login successfully",
                            to: email,
                            from: process.env.MAILING_ID,
                            html: content
                        };

                        mail.sendMail(mailOption)
                            .then(() => console.log("login mail sent to :", email))
                            .catch(err => {
                                console.log(err);
                                return res.send("something gone wrong Mail couldn't be sent");
                            });
                    });

                // send user to dashboard even if login notification wasn't sent to mail
                return res.render("College/dashboard");
            }
            else {
                console.log("password doesn't match");
                res.render("College/login");
            }
        })
        .catch(err => {
            console.log("something goes wrong", err);
            res.render("College/login");
        });
});



// dashboard
router.get("/dashboard", function (req, res) {
    res.render("College/dashboard");
});


module.exports = router;
