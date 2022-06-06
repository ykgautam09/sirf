//let's assume function f is used for calculating ratio
// UPIRF defined
function f(A, B) {
  return A / B;
}

// Student Strength function
function SSfunction(section, NT, NE, NP) {
  let SS;
  if (section.toLowerCase() == "architecture") {
    SS = f(NT, NE) * 20;
  } else {
    SS = f(NT, NE) * 15 + ff(NP) * 5;
  }
  return SS;
}

// faculty student ratio FSR
function FSRfunction(section, F, N, NP) {
  section = section.toLowerCase();
  let ratio;
  let FSR;

  // for architecture and management
  if (
    section == "architecture" ||
    section == "management" ||
    section == "college"
  ) {
    ratio = F / N;
    FSR = 30 * (15 * (F / N));
  }

  // for rest of the colleges
  else {
    N += NP;
    ratio = F / N;
    FSR = 30 * (15 * (F / N));
  }

  // ratio comparison to score score maximum marks required in each case
  switch (section) {
    case "architecture":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "management":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "engineering":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "pharmacy":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "law":
      if (ratio < 1 / 70) {
        FSR = 0;
      }
      break;
    case "medical":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "overall":
      if (ratio < 1 / 50) {
        FSR = 0;
      }
      break;
    case "college":
      if (ratio < 1 / 70) {
        FSR = 0;
      }
      break;
    default:
      FSR = 0;
      break;
  }
  return FSR;
}

// function for Component Metric of TLR
// parameters required
function FQE(FRA, F1, F2, F3) {
  let FQ, FE;

  if (FRA < 0.95)
    //95 in case of 95 value of percentage
    FQ = 10 * (FRA / 95);
  else FQ = 10;

  FE =
    3 * Math.min(3 * F1, 1) + 3 * Math.min(3 * F2, 1) + 4 * Math.min(3 * F3, 1);
  let FQE = FQ + FE;
  return { FQ, FQE, FE };
}

// function for Financial Resources and their Utilization

function FRUfunction(BC, BO) {
  return 7.5 * BC + 22.5 * BO; // f was used here in the sheet
}

// function for Combined metric for Publications
function PUfunction(section, FRQ, P) {
  // f(p/FRQ) ise used need to be analysed
  let PU;

  switch (section.toLowerCase()) {
    case "architecture":
      PU = (60 * P) / FRQ;
      break;
    case "management":
      PU = (40 * P) / FRQ;
      break;
    case "engineering":
      PU = (35 * P) / FRQ;
      break;
    case "pharmacy":
      PU = (35 * P) / FRQ;
      break;
    case "law":
      PU = (50 * P) / FRQ;
      break;
    case "medical":
      PU = (40 * P) / FRQ;
      break;
    case "college":
      PU = (70 * P) / FRQ;
      break;
    case "overall":
      PU = (35 * P) / FRQ;
      break;
    default:
      PU = 0;
      break;
  }
  return PU;
}

//function for Combined metric for Quality of Publications (QP)
// f function need to be checked
function QPfunction(section, P, CC) {
  section = section.toLowerCase();

  let QP;

  switch (section) {
    case "architecture":
      QP = (20 * CC) / P;
      break;
    case "management":
      QP = (40 * CC) / P;
      break;
    case "engineering":
      QP = (40 * CC) / P;
      break;
    case "pharmacy":
      QP = (40 * CC) / P;
      break;
    case "law":
      QP = (30 * CC) / P;
      break;
    case "medical":
      QP = (40 * CC) / P;
      break;
    case "college":
      QP = (30 * CC) / P;
      break;
    case "overall":
      QP = (35 * CC) / P;
      break;
    default:
      QP = 0;
      break;
  }
  return QP;
}

// function for IPR and Patents: Patents Published and Granted
// f function needs to be checked here too
function IPRfunction(section, PG, PP) {
  let IPR, IPG, IPP;
  section = section.toLowerCase();

  switch (section) {
    case "engineering":
      IPG = 10 * ff(PG);
      IPP = 5 * ff(PP);
      break;
    case "pharmacy":
      IPG = 10 * ff(PG);
      IPP = 5 * ff(PP);
      break;
    case "medical":
      IPG = 5 * ff(PG);
      IPP = 5 * ff(PP);
      break;
    case "overall":
      IPG = 10 * ff(PG);
      IPP = 5 * ff(PP);
      break;
    default:
      IPG = 0;
      IPP = 0;
      break;
  }
  IPR = IPG + IPP;
  return { IPP, IPG, IPR };
}

// function for Footprint of Projects and Professional Practice (FPPP)
// f function need to be handled
function FPPPfunction(section, CF, EP, RF, PBD = 0) {
  section = section.toLowerCase();
  let FPR, FPC, FPPP, FBD, EDPMDP;
  switch (section) {
    case "architecture":
      FPR = 10 * ff(RF);
      FPC = 10 * ff(CF);
      FPPP = FPR + FPC;
      break;
    case "management":
      FPR = 5 * ff(RF);
      FPC = 5 * ff(CF);
      EDPMDP = 10 * f(EP);
      FPPP = FPR + FPC + EDPMDP;
      break;
    case "overall":
      FPR = 5 * ff(RF);
      FPC = 5 * ff(CF);
      EDPMDP = 5 * ff(EP);
      FPPP = FPR + FPC + EDPMDP;
      break;
    case "engineering":
      FPR = 7.5 * ff(RF);
      FPC = 7.5 * ff(CF);
      FPPP = FPR + FPC;
      break;
    case "pharmacy":
      FPR = 7.5 * ff(RF);
      FPC = 7.5 * ff(CF);
      FPPP = FPR + FPC;
      break;
    case "medical":
      FPR = 5 * ff(RF);
      FBD = 5 * ff(PBD);
      FPPP = FPR + FBD;

      break;

    case "law":
      FPR = 10 * ff(RF);
      FPC = 10 * ff(CF);
      FPPP = FPR + FPC;

      break;

    default:
      FPR = 0;
      FPC = 0;
      FPPP = 0;
      break;
  }
  return { FPR, FPC, FPPP };
}

// function for Combined Metric for Placement and Higher Studies (GPH)
// parameters required
function GPHfunction(section, Nhs, Np) {
  section = section.toLowerCase();
  let GPH = 0;
  if (section == "medical") GPH = 30 * (Np / 100 + Nhs / 100);
  else {
    if (section == "overall") console.log("Not applicable");
    else GPH = 40 * (Np / 100 + Nhs / 100);
  }

  return GPH;
}

// function for Metric for University Examinations (GUE)
//parameters required
function GUEfunction(section, Ng) {
  section = section.toLowerCase();
  let GUE;

  switch (section) {
    case "architecture":
      GUE = 30 * Math.min(Ng / 80, 1);
      break;
    case "management":
      GUE = 20 * Math.min(Ng / 80, 1);
      break;
    case "engineering":
      GUE = 15 * Math.min(Ng / 80, 1);
      break;
    case "pharmacy":
      GUE = 15 * Math.min(Ng / 80, 1);
      break;
    case "law":
      GUE = 15 * Math.min(Ng / 80, 1);
      break;
    case "medical":
      GUE = 30 * Math.min(Ng / 80, 1);
      break;
    case "overall":
      GUE = 60 * Math.min(Ng / 80, 1);
      break;
    default:
      GUE = 0;
      break;
  }
  return GUE;
}

// function for Metric for University Examinations (GPHD)
//parameters required
function GPHDfunction(section, NPHD) {
  section = section.toLowerCase();
  let GPHD;

  switch (section) {
    case "architecture":
      GPHD = 0;
      break;
    case "management":
      GPHD = 0;
      break;
    case "engineering":
      GPHD = 20 * ff(NPHD);
      break;
    case "pharmacy":
      GPHD = 20 * ff(NPHD);
      break;
    case "law":
      GPHD = 20 * ff(NPHD);
      break;
    case "medical":
      GPHD = 30 * ff(NPHD);
      break;
    case "overall":
      GPHD = 40 * ff(NPHD);
      break;
    default:
      GPHD = 0;
      break;
  }
  return GPHD;
}

function ff(a) {
  return a / (a * 10);
}

// function for median salary GMS
// f function should be checked
function GMSfunction(section, MS) {
  section = section.toLowerCase();
  let GMS = 0;
  switch (section) {
    case "architecture":
      GMS = 30 * ff(MS);
      break;
    case "management":
      GMS = 40 * ff(MS);
      break;
    case "engineering":
      GMS = 25 * ff(MS);
      break;
    case "pharmacy":
      GMS = 25 * ff(MS);
      break;
    case "law":
      GMS = 25 * ff(MS);
      break;
    case "medical":
      break;
    case "college":
      GMS = 20 * ff(MS);
      break;
    case "overall":
      break;
    default:
      GMS = 0;
      break;
  }
  return GMS;
}

function RDFunction(section, os, oc) {
  let RD;
  if (section.toLowerCase() === "management") RD = 30 * os;
  else RD = 25 * os + 5 * oc;
  return RD;
}

// all the remaining function are almost same and can be implemented using the previous code
// calculating rank here
function Ranking(
  section,
  SS,
  FSR,
  FQE,
  FRU,
  PU = 0,
  QP = 0,
  IPR = 0,
  FPPP = 0,
  GPH = 0,
  GUE = 0,
  GMS = 0,
  GPHD = 0,
  GSS = 0,
  RD = 0,
  WD = 0,
  ESCS = 0,
  PCS = 0,
  PR = 1
) {
  let ranking;
  let TLR, RPC, GO, OI;
  switch (section.toLowerCase()) {
    case "architecture":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.6 * PU + 0.2 * QP + 0 * IPR + 0.2 * FPPP;
      GO = 0.4 * GPH + 0.3 * GUE + 0.3 * GMS + 0 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;

      ranking = 0.4 * TLR + 0.2 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;
      break;

    case "management":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.4 * PU + 0.4 * QP + 0 * IPR + 0.2 * FPPP;
      GO = 0.4 * GPH + 0.2 * GUE + 0.4 * GMS + 0 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;
      ranking = 0.3 * TLR + 0.3 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;

      break;

    case "engineering":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.35 * PU + 0.4 * QP + 0.15 * IPR + 0.1 * FPPP;
      GO = 0.4 * GPH + 0.15 * GUE + 0.25 * GMS + 0.2 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;
      ranking = 0.3 * TLR + 0.3 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;
      break;

    case "pharmacy":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.35 * PU + 0.4 * QP + 0.15 * IPR + 0.1 * FPPP;
      GO = 0.4 * GPH + 0.15 * GUE + 0.25 * GMS + 0.2 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;
      ranking = 0.3 * TLR + 0.3 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;

      break;

    case "law":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.5 * PU + 0.3 * QP + 0 * IPR + 0.2 * FPPP;
      GO = 0.4 * GPH + 0.15 * GUE + 0.25 * GMS + 0.2 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;
      ranking = 0.4 * TLR + 0.15 * RPC + 0.25 * GO + 0.1 * OI + 0.1 * PR;

      break;

    case "medical":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.4 * PU + 0.4 * QP + 0.1 * IPR + 0.1 * FPPP;
      GO = 0.3 * GPH + 0.3 * GUE + 0 * GMS + 0.3 * GPHD + 0.1 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;

      ranking = 0.3 * TLR + 0.3 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;
      break;

    case "college":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.7 * PU + 0.3 * QP + 0 * IPR + 0 * FPPP;
      GO = 0.4 * GPH + 0.4 * GUE + 0.2 * GMS + 0 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = 1;

      ranking = 0.4 * TLR + 0.15 * RPC + 0.25 * GO + 0.1 * OI + 0.1 * PR;
      break;

    case "overall":
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.35 * PU + 0.35 * QP + 0.15 * IPR + 0.15 * FPPP;
      GO = 0 * GPH + 0.6 * GUE + 0 * GMS + 0.4 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = PR;
      ranking = 0.3 * TLR + 0.3 * RPC + 0.2 * GO + 0.1 * OI + 0.1 * PR;
      break;
    default:
      TLR = 0.2 * SS + 0.3 * FSR + 0.2 * FQE + 0.3 * FRU;
      RPC = 0.7 * PU + 0.3 * QP + 0 * IPR + 0 * FPPP;
      GO = 0.4 * GPH + 0.4 * GUE + 0.2 * GMS + 0 * GPHD + 0 * GSS;
      OI = 0.3 * RD + 0.3 * WD + 0.2 * ESCS + 0.2 * PCS;
      PR = 1;

      ranking = 0.4 * TLR + 0.15 * RPC + 0.25 * GO + 0.1 * OI + 0.1 * PR;
      break;
  }
  return {
    ranking,
    TLR,
    RPC,
    GO,
    OI,
    PR
  };
}

module.exports = {
  SSfunction,
  FSRfunction,
  FQE,
  FRUfunction,
  PUfunction,
  QPfunction,
  IPRfunction,
  FPPPfunction,
  GPHfunction,
  GUEfunction,
  GPHDfunction,
  GMSfunction,
  RDFunction,
  ff,
  Ranking
};
