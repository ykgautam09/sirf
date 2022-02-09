
// Student Strength function
function studentStrength(section,NT,NE,NP) {
    var SS;
    if(section.toLowerCase()=="architecture"){
        SS=f(NT,NE)*15 +f(NP)*5;
    }
    else{
        SS= f(NT,NE)*20;
    }
    return SS;
}

// faculty student ratio
function facultyStudentratio(section,F,N,NP) {
    var ratio;
    var FSR;

    // for architecture and management
    if(section.toLowerCase()=="architecture"||section.toLowerCase()=="management "){
        ratio=F/N;
        FSR = 30*(15*(F/N))
    }

    // for rest of the colleges
    else{
       N+=NP;
       ratio=F/N;
       FSR = 30*(15*(F/N))
    } 

switch(section.toLowerCase()) {
        case "architecture ":
            if(ratio<1/50){
                FSR=0;
            }
          break;
        case "management":
            if(ratio<1/50){
                FSR=0;
            }
          break;
        case "engineering":
            if(ratio<1/50){
                FSR=0;
            }
          break;
        case "pharmacy":
            if(ratio<1/50){
                FSR=0;
            }
          break;
        case "law":
            if(ratio<1/70){
                FSR=0;
            }
          break;
        case "medical":
            if(ratio<1/50){
                FSR=0;
            }
          break;
        default:
            break;

      }
 return FSR;   
}


