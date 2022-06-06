const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const cred = require("../modules/credential");
const { sendMail } = require("../services/mail");
const scoreFormula = require("./../modules/rank_formula");

const db = require("./../db/models/index");
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
  try {
    if (req.params.code === process.env.SERVER_SECRET) {
      const year = req.query.year;
      const institute = await Institute.findAll({});
      let instituteId, studentStrength;
      let ss, nt, ne, np;
      let f, n, fsr;
      let fra, f1, f2, f3;
      let bc, bo, fru;
      let p, frq, pu;
      let cc, qp;
      let pp, pg;
      let cf, rf;

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
        counsultancy = await Consultancy.findOne({
          where: { year, institute_id: instituteId }
        });
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
        SS.create({ ss, np, ne, np, year, institute_id: instituteId });
        console.log(ss);

        // fsr
        f = 100; // need to fetched
        n = nt;
        fsr = scoreFormula.FSRfunction(instituteType, f, n, np);
        FSR.create({ f, n, fsr, year, institute_id: instituteId });

        // fqe
        fra = 20; // need to fetched
        f1 = 8;
        f2 = 6;
        f3 = 5;
        let { FQE, FE, FQ } = scoreFormula.FQE(fra, f1, f2, f3);
        FQEDb.create({
          fra,
          fqe: FQE,
          fe: FE,
          fq: FQ,
          f1,
          f2,
          f3,
          year,
          institute_id: instituteId
        });

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
        fru = scoreFormula.FRUfunction(instituteType, bc, bo);
        FRU.create({ bc, bo, fru, year, institute_id: instituteId });

        // // pu
        // p = 20; // need to fetched
        // frq = 7; // need to fetched
        // pu = scoreFormula.PUfunction(instituteType, frq, p);
        // PU.create({ p, frq, pu, year, institute_id: instituteId });
        //
        // // qp
        // cc = 12; // need to fetched
        // qp = scoreFormula.QPfunction(instituteType, p, cc);
        // QP.create({ cc, qp, p, year, institute_id: instituteId });

        // // ipr
        // pp = iprForm.patent_pub_current + iprForm.patent_pub_prev + iprForm.patent_pub_second;
        // pg = iprForm.patent_granted_current + iprForm.patent_granted_prev + iprForm.patent_granted_second;
        // let { IPG, IPR, IPP } = scoreFormula.IPRfunction(instituteType, pg, pp);
        // IPRDb.create({ pp, pg, ipr: IPR, ipg: IPG, ipp: IPP, year, institute_id: instituteId })

        // // fppp
        // cf = (counsultancy.total_amt_current + counsultancy.total_amt_prev + counsultancy.total_amt_second) / 3;
        // rf = (sponsor.total_amt_current + sponsor.total_amt_prev + sponsor.total_amt_second) / 3;
        // ep:1200000;  // need to fetched
        // let { FPR, FPPP, FPC } = scoreFormula.FPPPfunction(instituteType, cf, ep, rf);
        // FPPPDb.create({ cf, rf, ep, fpr: FPR, fppp: FPPP, fpc: FPC, year, institute_id: instituteId });

        // final rank
        let { GO, OI, PR, TLR, ranking, RPC } = scoreFormula.Ranking(
          instituteType,
          ss,
          fsr,
          FQE,
          fru
        );
        InstituteRank.create({
          go: GO,
          oi: OI,
          pr: PR,
          tlr: TLR,
          rank: ranking,
          rpc: RPC,
          year,
          institute_id: instituteId
        });
      }
      return res.send("ranking generation started...");
    } else throw new Error("you are not authorized to generate ranks");
  } catch (err) {
    console.log(err);
    return res.send("you are not authorized to generate ranks");
  }
});

router.get("/ranking", async (req, res) => {
  const ranks = await InstituteRank.findAll({ order: ["rank"] });
  return res.json(ranks);
});
module.exports = router;
