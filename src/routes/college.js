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
const StudentStrngth = db.student_strength;
const Placement = db.placement;
const Phd = db.phd;
const Financial = db.financial;
const Annual = db.annual_exp;
const Ipr = db.ipr;
const Iprforms = db.ipr_form;
const Sponsor = db.spon;
const Consultancy = db.consult;
const Pcs = db.pc;
const Pcsforms = db.pcs_form;

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
      const instituteRes = await Institute.findOne({
        where: { email: userData.email }
      });

      // user email already exists
      if (instituteRes && instituteRes?.email === userData.email) {
        console.log(
          `user ${instituteRes.email} already in database::`,
          instituteRes
        );
        throw new Error("user already exists");
      }

      // save user data in database
      const institute = await Institute.create(userData, { transaction });
      console.log(institute);
      if (!institute) throw new Error("user couldn't be created");
      console.log("user inserted in registration table", userData.email);

      // generate otp and save into database
      let otp = cred.genOtp();

      // generate verification link
      let verificationLink = `${req.protocol}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/college/verify/${userData.email}/?code=${otp}`;

      // save otp in otp table
      const dbOtp = await OTP.create(
        {
          code: otp,
          institute_id: institute.id,
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
      res.send("Something went wrong!" + err);
    }
  }
);

// verify registered mail
router.get("/:path/:email", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    let email = req.params.email;
    let pass = req.query.code;

    // read otp created less than 2 min ago
    const institute = await Institute.findOne({ where: { email } });
    if (!institute) throw new Error("User doesn't exist");
    const otpRes = await OTP.findOne({
      where: { expiry_at: { [db.Sequelize.Op.gte]: db.Sequelize.fn("NOW") } },
      institute_id: institute.id
    });
    let otp = otpRes.code;
    if (otp === pass) {
      console.log("account verified successfully");
      // asynchronously delete stored otp once used Successfully
      await OTP.destroy(
        { where: { institute_id: institute.id, code: otp } },
        { transaction }
      );
    }
    // generate user password after user verification
    let password = cred.genPassword();
    let passHash = cred.genHash(password);

    // account verified and set password to set account active
    await Institute.update(
      { password: passHash },
      { where: { id: institute.id } },
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

// college login
router.get("/login", (req, res) => {
  res.render("College/login");
});

// login using password and email
router.post("/login", async (req, res) => {
  try {
    let email = req.body.userEmail;
    let password = req.body.password;

    const institute = await Institute.findOne({ where: { email } });
    let hash = institute.password;
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

    return res.render("College/dashboard", {
      instituteId: institute.aktu_id,
      instituteName: "KNNNI"
    });
  } catch (err) {
    console.log("something goes wrong", err);
    res.send("Credentials Doesn't Matched!");
  }
});

// college forgot Password
router.get("/forgot-password", (req, res) => {
  res.render("College/forgot_password");
});

router.post("/forgot-password", async (req, res) => {
  try {
    let email = req.body.email;

    const institute = await Institute.findOne({ where: { email } });
    if (institute.id) {
      console.log("user exists in db");

      let otp = cred.genOtp();
      // save otp in otp table
      const password = await OTP.create({
        code: otp,
        institute_id: institute.id,
        expiry_at: addMinutes(new Date().getTime(), 2)
      }); // otp valid for 2 min
      // generate verification link
      let verificationLink = `${req.protocol}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/college/password-reset/${email}/?code=${otp}`;

      // read mailing template to send login notification
      ejs
        .renderFile(
          path.join(__dirname, "..", "views", "Mail", "registration.ejs"),
          {
            verificationLink,
            email
          }
        )
        .then(async (mailTemplate) => {
          // send user email with login details
          let mailOption = {
            subject: "UPIRF:Password Reset Request",
            to: email,
            from: process.env.MAILING_ID,
            html: mailTemplate
          };

          const mailRes = await sendMail(mailOption);
          // send user to dashboard even if login notification wasn't sent to mail
          if (!mailOption) throw new Error("Couldn't sent otp");
        });
    } else throw new Error("Couldn't find user");

    return res.render("College/enter_otp");
  } catch (err) {
    console.log("something goes wrong", err);
    res.send("Something went wrong!");
  }
});

// college enter OTP
router.get("/enter-otp", (req, res) => {
  res.render("College/enter_otp");
});

router.post("/enter-otp", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    let email = req.post.email;
    let pass = req.query.code;

    // read otp created less than 2 min ago
    const institute = await Institute.findOne({ where: { email } });
    if (!institute) throw new Error("User doesn't exist");
    const otpRes = await OTP.findOne({
      where: { expiry_at: { [db.Sequelize.Op.gte]: db.Sequelize.fn("NOW") } },
      institute_id: institute.id
    });
    let otp = otpRes.code;
    if (otp === pass) {
      console.log("account verified successfully");
      // asynchronously delete stored otp once used Successfully
      await OTP.destroy(
        { where: { institute_id: institute.id, code: otp } },
        { transaction }
      );
    }
    // generate user password after user verification
    let password = cred.genPassword();
    let passHash = cred.genHash(password);

    // account verified and set password to set account active
    await Institute.update(
      { password: passHash },
      { where: { id: institute.id } },
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

// college register
router.get("/register", (req, res) => {
  res.render("College/register");
});

// dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const sug4 = await StudentStrngth.findOne({
      where: { institute_id: "123456", course: "ug4" }
    });
    const sug5 = await StudentStrngth.findOne({
      where: { institute_id: "123456", course: "ug5" }
    });
    const spg2 = await StudentStrngth.findOne({
      where: { institute_id: "123456", course: "pg2" }
    });
    const spgin = await StudentStrngth.findOne({
      where: { institute_id: "123456", course: "pgIntegrated" }
    });
    const pug4 = await Placement.findOne({
      where: { institute_id: "123456", course: "ug4" }
    });
    const pug5 = await Placement.findOne({
      where: { institute_id: "123456", course: "ug5" }
    });
    const ppg2 = await Placement.findOne({
      where: { institute_id: "123456", course: "pg2" }
    });
    const ppgin = await Placement.findOne({
      where: { institute_id: "123456", course: "pgIntegrated" }
    });
    console.log("hello sug4 new", sug4);
    const phdData = await Phd.findOne({
      where: { institute_id: "123456" }
    });
    const financialData = await Financial.findOne({
      where: { institute_id: "123456" }
    });
    const annualData = await Annual.findOne({
      where: { institute_id: "123456" }
    });
    const iprData = await Iprforms.findOne({
      where: { institute_id: "123456" }
    });
    const sponData = await Sponsor.findOne({
      where: { institute_id: "123456" }
    });
    const consData = await Consultancy.findOne({
      where: { institute_id: "123456" }
    });
    const psData = await Pcsforms.findOne({
      where: { institute_id: "123456" }
    });
    res.render("College/dashboard", {
      instituteId: "123456",
      instituteName: "KNIT",
      phd: phdData,
      financial: financialData,
      annual: annualData,
      ipr: iprData,
      spon: sponData,
      cons: consData,
      ps: psData,
      sug4: sug4,
      sug5: sug5,
      spg2: spg2,
      spgin: spgin,
      pug4: pug4,
      pug5: pug5,
      ppg2: ppg2,
      ppgin: ppgin
    });
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

// handle student strength data
router.post("/dashboard/student-strength/:course", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    let studentStrengthData = {
      msn: parseInt(req.body.maleStudents),
      fsn: parseInt(req.body.femaleStudents),
      tsn: parseInt(req.body.totalStudents),
      in_state_mf: parseInt(req.body.withinState),
      out_state_mf: parseInt(req.body.outsideState),
      out_country_mf: parseInt(req.body.outsideCountry),
      eco_back_mf: parseInt(req.body.economicallyBackward),
      social_chal_mf: parseInt(req.body.sociallyChallenged),
      tution_fee_reimburse_state_center: parseFloat(req.body.feeState),
      tution_fee_reimburse_institute: parseFloat(req.body.feeInstitute),
      tution_fee_reimburse_private: parseFloat(req.body.feePrivate),
      no_tution_fee_reimburse: parseFloat(req.body.notFee),
      course: req.params.course,
      institute_id: institute.id
    };
    const studentStrength = await StudentStrngth.create(studentStrengthData);
    if (!studentStrength) throw new Error("can't save");
    console.log(studentStrength);
    return res.json(studentStrength);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});
// handle student placement data
router.post("/dashboard/placement/:course", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    let placementData = {
      intake_firstyr_total: parseInt(req.body.firstYearIntake),
      first_year_total: parseInt(req.body.firstYearAdmitted),
      academic: parseInt(req.body.academicYear),
      lateral_total: parseInt(req.body.lateralEntry),
      acade_year: parseInt(req.body.acadeYear),
      min_time: parseInt(req.body.minStipulatedTime),
      placed_total: parseInt(req.body.placed),
      med_salary: parseInt(req.body.medianSalary),
      high_studies_total: parseInt(req.body.higherStudies),
      course: req.params.course,
      institute_id: institute.id
    };
    console.log("hello ", placementData);
    const placement = await Placement.create(placementData);
    if (!placement) throw new Error("can't save");
    console.log(placement);
    return res.json(placement);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/phd-student-details", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    let phdData = {
      full_time_total: parseInt(req.body.fullTime),
      part_time_total: parseInt(req.body.partTime),
      academic_current: parseInt(req.body.Prev1),
      academic_prev: parseInt(req.body.Prev2),
      academic_second: parseInt(req.body.Prev3),
      part_time_total_current: parseInt(req.body.partTimePrev1),
      part_time_total_prev: parseInt(req.body.partTimePrev2),
      part_time_total_second: parseInt(req.body.partTimePrev3),
      full_time_total_current: parseInt(req.body.fullTimePrev1),
      full_time_total_prev: parseInt(req.body.fullTimePrev2),
      full_time_total_second: parseInt(req.body.fullTimePrev3),
      course: req.params.course,
      institute_id: institute.id
    };
    console.log("hello ", phdData);
    const phd = await Phd.create(phdData);
    if (!phd) throw new Error("can't save");
    console.log(phd);
    return res.json(phd);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/financial-resources", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    let frData = {
      library_current: parseInt(req.body.libraryPrev1),
      library_prev: parseInt(req.body.libraryPrev2),
      library_second: parseInt(req.body.libraryPrev3),
      new_equip_current: parseInt(req.body.newEquipmentsPrev1),
      new_equip_prev: parseInt(req.body.newEquipmentsPrev2),
      new_equip_second: parseInt(req.body.newEquipmentsPrev3),
      engg_workshop_current: parseInt(req.body.engineeringWorkshopPrev1),
      engg_workshop_prev: parseInt(req.body.engineeringWorkshopPrev2),
      engg_workshop_second: parseInt(req.body.engineeringWorkshopPrev3),
      other_exp_current: parseInt(req.body.otherPrev1),
      other_exp_prev: parseInt(req.body.otherPrev2),
      other_exp_second: parseInt(req.body.otherPrev3),
      course: req.params.course,
      institute_id: institute.id
    };
    console.log("hello ", frData);
    const fr = await Financial.create(frData);
    if (!fr) throw new Error("can't save");
    console.log(fr);
    return res.json(fr);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});
router.post("/dashboard/annual-expenditure", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    let annualExpData = {
      sal_current: parseInt(req.body.salaryPrev1),
      sal_prev: parseInt(req.body.salaryPrev2),
      sal_second: parseInt(req.body.salaryPrev3),
      mainte_current: parseInt(req.body.maintenancePrev1),
      mainte_prev: parseInt(req.body.maintenancePrev2),
      mainte_second: parseInt(req.body.maintenancePrev3),
      seminar_current: parseInt(req.body.seminarsPrev1),
      seminar_prev: parseInt(req.body.seminarsPrev2),
      seminar_second: parseInt(req.body.seminarsPrev3),
      course: req.params.course,
      institute_id: institute.id
    };
    console.log("hello ", annualExpData);
    const annual_ex = await Annual.create(annualExpData);
    if (!annual_ex) throw new Error("can't save");
    console.log(annual_ex);
    return res.json(annual_ex);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/ipr-details", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    console.log("hello ", req.body);
    let iprData = {
      cal_yr_current: parseInt(req.body.yearPrev1),
      cal_yr_prev: parseInt(req.body.yearPrev2),
      cal_yr_second: parseInt(req.body.yearPrev3),
      patent_pub_current: parseInt(req.body.patentsPublishedPrev1),
      patent_pub_prev: parseInt(req.body.patentsPublishedPrev2),
      patent_pub_second: parseInt(req.body.patentsPublishedPrev3),
      patent_granted_current: parseInt(req.body.patentsGrantedPrev1),
      patent_granted_prev: parseInt(req.body.patentsGrantedPrev1),
      patent_granted_second: parseInt(req.body.patentsGrantedPrev1),
      course: req.params.course,
      institute_id: institute.id
    };
    const ipr = await Ipr.create(iprData);
    if (!ipr) throw new Error("can't save");
    console.log(ipr);
    return res.json(ipr);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/sponsored-research", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    console.log("hello ", req.body);
    let sponsorData = {
      fin_yr_current: parseInt(req.body.financeYearPrev1),
      fin_yr_prev: parseInt(req.body.financeYearPrev2),
      fin_yr_second: parseInt(req.body.financeYearPrev3),
      spons_current: parseInt(req.body.sponsoredProjectPrev1),
      spons_prev: parseInt(req.body.sponsoredProjectPrev2),
      spons_second: parseInt(req.body.sponsoredProjectPrev3),
      agencies_current: parseInt(req.body.fundingAgenciesPrev1),
      agencies_prev: parseInt(req.body.fundingAgenciesPrev2),
      agencies_second: parseInt(req.body.fundingAgenciesPrev3),
      total_amt_current: parseInt(req.body.amtRPrev1),
      total_amt_prev: parseInt(req.body.amtRPrev2),
      total_amt_second: parseInt(req.body.amtRPrev3),

      total_amt_rec_current: parseInt(req.body.amtWPrev1),
      total_amt_rec_prev: parseInt(req.body.amtWPrev2),
      total_amt_rec_second: parseInt(req.body.amtWPrev3),

      course: req.params.course,
      institute_id: institute.id
    };
    const sponsor = await Sponsor.create(sponsorData);
    if (!sponsor) throw new Error("can't save");
    console.log(sponsor);
    return res.json(sponsor);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/consultancy-project", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    console.log("hello ", req.body);
    let consultancyData = {
      fin_yr_current: parseInt(req.body.finYearPrev1),
      fin_yr_prev: parseInt(req.body.finYearPrev2),
      fin_yr_second: parseInt(req.body.finYearPrev3),
      cons_current: parseInt(req.body.totalConsultancyProjectPrev1),
      cons_prev: parseInt(req.body.totalConsultancyProjectPrev2),
      cons_second: parseInt(req.body.totalConsultancyProjectPrev3),
      total_client_current: parseInt(req.body.totalClientPrev1),
      total_client_prev: parseInt(req.body.totalClientPrev2),
      total_client_second: parseInt(req.body.totalClientPrev3),
      total_amt_current: parseInt(req.body.amtRPrev1),
      total_amt_prev: parseInt(req.body.amtRPrev2),
      total_amt_second: parseInt(req.body.amtRPrev3),

      total_amt_rec_current: parseInt(req.body.amtWPrev1),
      total_amt_rec_prev: parseInt(req.body.amtWPrev2),
      total_amt_rec_second: parseInt(req.body.amtWPrev3),

      course: req.params.course,
      institute_id: institute.id
    };
    const consultancy = await Consultancy.create(consultancyData);
    if (!consultancy) throw new Error("can't save");
    console.log(consultancy);
    return res.json(consultancy);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});

router.post("/dashboard/pcs-facilities", async (req, res) => {
  try {
    console.log(req.body);
    const institute = await Institute.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { aktu_id: req.body.instituteId },
          { aicte_id: req.body.instituteId }
        ]
      }
    });
    if (!institute) throw new Error("no institute");
    console.log("hello ", req.body);
    let pcsData = {
      have_lift_current: parseInt(req.body.liftPrev1),
      have_lift_prev: parseInt(req.body.liftPrev2),
      have_lift_second: parseInt(req.body.liftPrev3),
      walking_aids_current: parseInt(req.body.walkingAidsPrev1),
      walking_aids_prev: parseInt(req.body.walkingAidsPrev2),
      walking_aids_second: parseInt(req.body.walkingAidsPrev3),
      toilets_current: parseInt(req.body.toiletsPrev1),
      toilets_prev: parseInt(req.body.toiletsPrev2),
      toilets_second: parseInt(req.body.toiletsPrev3),

      course: req.params.course,
      institute_id: institute.id
    };
    const pcs = await Pcs.create(pcsData);
    if (!pcs) throw new Error("can't save");
    console.log(pcs);
    return res.json(pcs);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});
router.post("/dashboard/get-id", async (req, res) => {
  try {
    let email = req.body.email;
    let id = await Institute.findOne({ where: { email: email } });
    console.log("hello ", id.aktu_id);
    return res.json(id);
  } catch (err) {
    console.log("data could not be saved", err);
    res.send("Couldn't save data");
  }
});
module.exports = router;
