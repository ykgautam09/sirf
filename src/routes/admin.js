const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const cred = require("../modules/credential");
const { sendMail } = require("../services/mail");
const scoreFormula = require("./../modules/rank_formula");

const db = require("./../db/models/index");
const { ff } = require("../modules/rank_formula");
const { getYear } = require("date-fns");
const SS = db.ss;
const FSR = db.fsr;
const FQEDb = db.fqe;
const FRU = db.fru;
const PU = db.pu;
const QP = db.qp;
const IPRDb = db.ipr;
const FPPPDb = db.fppp;
const GPH = db.gph;
const GUE = db.gue;
const GMS = db.gms;
const GPHD = db.gphd;
const RD = db.rd;
const WD = db.wd;
const ESCS = db.escs;
const GSS = db.gss;
const PCS = db.pcs;
const PR = db.pr;
const Institute = db.Institute;
const StudentStrength = db.student_strength;
const Consultancy = db.consult;
const Placement = db.placement;
const PHD = db.phd;
const Financial = db.financial;
const AnnualExp = db.annual_exp;
const Sponsors = db.spon;
const IprForm = db.ipr_form;
const PcsForms = db.pcs_form;
const InstituteRank = db.institute_rank;

router.get("/generate-rank/:code", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    if (req.params.code === process.env.SERVER_SECRET) {
      const year = req.query.year;
      const institute = await Institute.findAll(); // remove banned
      let instituteId,
        studentStrength,
        annualExp,
        consultancy,
        financial,
        phd,
        placement,
        sponsor,
        pcsForm,
        iprForm;
      let ss, nt, ne, np;
      let f, n, fsr;
      let fra, f1, f2, f3;
      let bc, bo, fru;
      let p, frq, pu;
      let cc, qp;
      let pp, pg;
      let cf, rf, ep;
      let npp, nhs, gph;
      let ng, gue;
      let ms, gms;
      let nphd, gphd;
      let os, oc, rd;
      let nws, nwf, wd;
      let nesc, escs;
      let pcs;

      // calculate score for each institute
      for (let i = 1; i < institute.length; i++) {
        instituteId = institute[i].id;
        instituteType = institute[i].course;
        console.log(instituteId, instituteType);

        // student strength
        studentStrength = await StudentStrength.findOne({
          where: { year, institute_id: instituteId }
        });
        // annualExp
        annualExp = await AnnualExp.findOne({
          where: { year, institute_id: instituteId }
        });
        // consultancy
        consultancy = await Consultancy.findOne({
          where: { year, institute_id: instituteId }
        });
        console.log("consultancy", consultancy);
        // financial
        financial = await Financial.findOne({
          where: { year, institute_id: instituteId }
        });
        // phd
        phd = await PHD.findOne({ where: { year, institute_id: instituteId } });
        // placement
        placement = await Placement.findOne({
          where: { year, institute_id: instituteId }
        });
        // sponsor
        sponsor = await Sponsors.findOne({
          where: { year, institute_id: instituteId }
        });
        // pcs form
        pcsForm = await PcsForms.findOne({
          where: { year, institute_id: instituteId }
        });
        // iprForm
        iprForm = await IprForm.findOne({
          where: { year, institute_id: instituteId }
        });

        // ss
        nt = studentStrength.tsn;
        ne = studentStrength.tsn;
        np = phd.full_time_total + phd.part_time_total;
        ss = scoreFormula.SSfunction(instituteType, nt, ne, np);
        await SS.create(
          { ss, np, ne, np, year, institute_id: instituteId },
          { transaction }
        );
        console.log(ss);

        // fsr
        f = 100; // need to fetched
        n = nt;
        fsr = scoreFormula.FSRfunction(instituteType, f, n, np);
        await FSR.create(
          { f, n, fsr, year, institute_id: instituteId },
          { transaction }
        );

        // fqe
        fra = 20; // need to fetched
        f1 = 8;
        f2 = 6;
        f3 = 5;
        let { FQE, FE, FQ } = scoreFormula.FQE(fra, f1, f2, f3);
        await FQEDb.create(
          {
            fra,
            fqe: FQE,
            fe: FE,
            fq: FQ,
            f1,
            f2,
            f3,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // fru
        bc =
          (annualExp.sal_current +
            annualExp.sal_prev +
            annualExp.sal_second +
            annualExp.seminar_current +
            annualExp.seminar_prev +
            annualExp.seminar_second) /
          3;
        bo =
          (annualExp.mainte_current +
            annualExp.mainte_prev +
            annualExp.mainte_second) /
          3;
        fru = scoreFormula.FRUfunction(bc, bo);
        await FRU.create(
          { bc, bo, fru, year, institute_id: instituteId },
          { transaction }
        );

        // pu
        p = 20; // need to fetched
        frq = 7; // need to fetched
        pu = scoreFormula.PUfunction(instituteType, frq, p);

        await PU.create(
          { p, frq, pu, year, institute_id: instituteId },
          { transaction }
        );

        // qp
        cc = 12; // need to fetched
        qp = scoreFormula.QPfunction(instituteType, p, cc);
        await QP.create(
          { cc, qp, p, year, institute_id: instituteId },
          { transaction }
        );

        // ipr
        pp =
          iprForm.patent_pub_current +
          iprForm.patent_pub_prev +
          iprForm.patent_pub_second;
        pg =
          iprForm.patent_granted_current +
          iprForm.patent_granted_prev +
          iprForm.patent_granted_second;
        let { IPG, IPR, IPP } = scoreFormula.IPRfunction(instituteType, pg, pp);
        await IPRDb.create(
          {
            pp,
            pg,
            ipr: IPR,
            ipg: IPG,
            ipp: IPP,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // fppp
        cf =
          (consultancy.total_amt_current +
            consultancy.total_amt_prev +
            consultancy.total_amt_second) /
          3;
        rf =
          (sponsor.total_amt_current +
            sponsor.total_amt_prev +
            sponsor.total_amt_second) /
          3;
        ep = 1200000; // need to fetched
        let { FPR, FPPP, FPC } = scoreFormula.FPPPfunction(
          instituteType,
          cf,
          ep,
          rf
        );
        await FPPPDb.create(
          {
            cf,
            rf,
            ep,
            fpr: FPR,
            fppp: FPPP,
            fpc: FPC,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // GPH
        npp = placement.placed_total;
        nhs = placement.high_studies_total;
        gph = scoreFormula.GPHfunction(instituteType, nhs, npp);
        await GPH.create(
          {
            np: npp,
            gph,
            nhs,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // GUE
        ng = (nt * 100) / (nt + np);
        gue = scoreFormula.GUEfunction(instituteType, ng);
        await GUE.create(
          {
            ng,
            gue,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // GMS
        ms = placement.med_salary;
        gms = scoreFormula.GMSfunction(instituteType, ms);
        await GMS.create(
          {
            ms,
            gms,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // GPHD
        nphd =
          phd.part_time_total_prev +
          phd.part_time_total_current +
          phd.part_time_total_second +
          phd.full_time_total_prev +
          phd.full_time_total_current +
          phd.full_time_total_second;
        gphd = scoreFormula.GPHDfunction(instituteType, nphd);
        await GPHD.create(
          {
            nphd,
            gphd,
            year,
            institute_id: instituteId
          },
          { transaction }
        );

        // RD
        os = studentStrength.out_state_mf / nt;
        oc = studentStrength.out_country_mf / nt;
        rd = scoreFormula.RDFunction(instituteType, os, oc);
        await RD.create({
          rd,
          os,
          oc,
          year,
          institute_id: instituteId
        });

        // WD
        nws = (studentStrength.fsn * 100) / nt;
        nwf = 15; // need to fetched
        wd = 15 * (nws / 50) + 15 * (nwf / 20);
        await WD.create({
          wd,
          nws,
          nwf,
          year,
          institute_id: instituteId
        });

        // ESCS
        nesc = (studentStrength.tution_fee_reimburse_institute * 100) / nt;
        escs = 20 * ff(nesc);
        await WD.create({
          nesc,
          escs,
          institute_id: instituteId
        });

        // PCS
        pcs = 20; // need to fetched

        // final rank
        let { GO, OI, PR, TLR, ranking, RPC } = scoreFormula.Ranking(
          instituteType,
          ss,
          fsr,
          FQE,
          fru,
          pu,
          qp,
          IPR,
          FPPP,
          gph,
          gue,
          gms,
          gphd,
          (gss = 0),
          rd,
          wd,
          escs,
          pcs,
          (pr = 1)
        );
        await InstituteRank.create(
          {
            go: GO,
            oi: OI,
            pr: PR,
            tlr: TLR,
            rank: ranking,
            rpc: RPC,
            year,
            institute_id: instituteId,
            category: instituteType.toLowerCase()
          },
          { transaction }
        );
      }
      await transaction.commit();
      return res.send("ranking generation started...");
    } else throw new Error("you are not authorized to generate ranks");
  } catch (err) {
    console.log(err);
    transaction.revert();
    return res.send("you are not authorized to generate ranks");
  }
});

router.get("/ranking/:course/:year", async (req, res) => {
  let year = req.params.year | getYear(Date.now()),
    course = req.params.course;
  let ranks;
  if (
    course == "law" ||
    course == "management" ||
    course == "engineering" ||
    course == "pharmacy" ||
    course == "architecture"
  )
    ranks = await InstituteRank.findAll({
      order: ["rank"],
      where: { year, category: course }
    });
  else
    ranks = await InstituteRank.findAll({ order: ["rank"], where: { year } });
  // const ranks = await InstituteRank.findAll({ order: ["rank"] ,include:[Institute]},);
  console.log("ranks ", ranks);
  let names = [];
  for (let i = 0; i < ranks.length; i++) {
    let name = await Institute.findOne({
      where: { id: ranks[i].institute_id }
    });
    console.log(name);
    names.push(name.name);
    // console.log(name[0].name);
  }

  // console.log(names);
  return res.render("Home/ranking_table", { ranks: ranks, names: names });
});

module.exports = router;
