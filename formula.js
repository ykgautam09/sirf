
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
function facultyStudentratio(section,F,N) {
    var ratio=F/N;
    var FSR;
    if(section.toLowerCase()=="architecture"){
        if(ratio<0.0200){
            FSR=0;
        }
        else{
            FSR=30*(15*(ratio));
        }
    }
    else{
        if(ratio<0.014285714285714285){
            FSR=0;
        }
        else{
            FSR=30*(15*(ratio));
        }
    }    
 return FSR;   
}

