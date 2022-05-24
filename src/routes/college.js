const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const { addMinutes } = require("date-fns");
const upload = require("../services/upload");
const cred = require("../modules/credential");
const { sendMail } = require("../services/mail");
const db = require("./../db/models/index");
const Institute = db.Institute;
const OTP = db.OTP;

// college login
router.get("/login", (req, res) => {
  res.render("College/login");
});

// college forgot Password
router.get("/forgot-password", (req, res) => {
  res.render("College/forgot_password");
});

// college enter OTP
router.get("/enter-otp", (req, res) => {
  res.render("College/enter_otp");
});

// college register
router.get("/register", (req, res) => {
  res.render("College/register");
});

// accept user data from register page
router.post(
  "/register",
  upload.single("collegeCertificate"),
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      let userData = {
        aktu_id: req.body.aktuId,
        name: req.body.collegeName,
        email: req.body.collegeEmail,
        type: req.body.collegeType,
        certificate: req.file.filename
      };
      console.log(userData, ")))___");
      const institute = await Institute.findOne({
        where: { email: userData.email }
      });

      // user email already exists
      if (institute && institute?.email === userData.email) {
        console.log(`user ${institute.email} already in database::`, institute);
        throw new Error("user already exists");
      }

      // save user data in database
      const user = await Institute.create(userData, { transaction });
      console.log(user);
      if (!user) throw new Error("user couldn't be created");
      console.log("user inserted in registration table", userData.email);

      // generate otp and save into database
      let otp = cred.genOtp();

      // generate verification link
      let verificationLink = `${req.protocol}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/college/verify/${userData.email}/?code=${otp}`;

      // save otp in otp table
      const dbOtp = await OTP.create(
        {
          code: otp,
          user_id: user.id,
          expiry_at: addMinutes(new Date().getTime(), 2)
        },
        { transaction }
      ); // otp valid for 2 min
      if (dbOtp && !dbOtp.code) throw new Error("couldn't save otp");
      // read mailing template for verification after registration
      ejs
        .renderFile(
          path.join(__dirname, "..", "views", "Mail", "registration.ejs"),
          {
            verificationLink,
            email: userData.email
          }
        )
        .then(async (mailTemplate) => {
          // send user email for verification
          let mailOption = {
            subject: "Verify your UPIRF account",
            to: userData.email,
            from: process.env.MAILING_ID,
            html: mailTemplate
          };
          const mailRes = await sendMail(mailOption);
          if (!mailOption) {
            throw new Error(mailRes.toString());
          }
        });
      await transaction.commit();
      return res.render("College/login");
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      res.send("Something gone wrong" + err);
    }
  }
);

router.get("/verify/:email", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    let email = req.params.email;
    let pass = req.query.code;

    // read otp created less than 2 min ago
    const user = await Institute.findOne({ where: { email } });
    if (!user) throw new Error("User doesn't exist");
    const otpRes = await OTP.findOne({
      where: { expiry_at: { [db.Sequelize.Op.gte]: db.Sequelize.fn("NOW") } },
      user_id: user.id
    });
    let otp = otpRes.code;
    if (otp === pass) {
      console.log("account verified successfully");
      // asynchronously delete stored otp once used Successfully
      await OTP.destroy(
        { where: { user_id: user.id, code: otp } },
        { transaction }
      );
    }
    // generate user password after user verification
    let password = cred.genPassword();
    let passHash = cred.genHash(password);

    // account verified and set password to set account active
    await Institute.update(
      { password: passHash },
      { where: { id: user.id } },
      { transaction }
    );
    // read mailing template to send credentials back to user
    ejs
      .renderFile(
        path.join(__dirname, "..", "views", "Mail", "credential.ejs"),
        { email, pass: password }
      )
      .then(async (mailTemplate) => {
        // send user email with credentials
        let mailOption = {
          subject: "Account Activated Successfully",
          to: email,
          from: process.env.MAILING_ID,
          html: mailTemplate
        };
        const mailRes = await sendMail(mailOption);
        if (!mailOption) {
          throw new Error(mailRes.toString());
        }
      });
    return res.render("College/login");
  } catch (err) {
    console.log("link doesn't matched with database", err);
    res.send("Either link is already used or it is expired");
  }
});

router.post("/login", async (req, res) => {
  try {
    let email = req.body.userEmail;
    let password = req.body.password;

    const user = await Institute.findOne({ where: { email } });
    let hash = user.password;
    if (cred.compareHash(password, hash)) {
      console.log("login successfully");

      // read mailing template to send login notification
      ejs
        .renderFile(path.join(__dirname, "..", "views", "Mail", "login.ejs"), {
          email,
          pass: password
        })
        .then(async (mailTemplate) => {
          // send user email with login details
          let mailOption = {
            subject: "Login successfully",
            to: email,
            from: process.env.MAILING_ID,
            html: mailTemplate
          };

          const mailRes = await sendMail(mailOption);
          // send user to dashboard even if login notification wasn't sent to mail
          if (!mailOption) console.log(mailRes);
        });
    } else throw new Error("password doesn't match");

    return res.render("College/dashboard");
  } catch (err) {
    console.log("something goes wrong", err);
    res.send(err.toString());
  }
});

// dashboard
router.get("/dashboard", (req, res) => {
  res.render("College/dashboard");
});

module.exports = router;
