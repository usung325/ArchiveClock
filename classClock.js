class MasterClock {
    constructor (n, w, h, angleVInit, xOffset, yOffset){
        this.n = n;
        this.w = w;
        this.h = h;
        this.timeTraveling = false;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        // this.counter = 0;
        // this.minCounter = 0;
        this.hrCounter = 0;

        this.initHr = 0;
        this.initMin = 0;
        this.initSec = 0;

        this.sliceOf60 = floor(180 / 30);
        this.slice = floor(180 / n);


        this.clockOffset = this.slice; // this is just for clock to be shifted a little bit
        this.angle = 0 - (this.slice * (n/2)) + (this.slice * 0.5)  - this.clockOffset;
        this.angleV = angleVInit;
        this.angleA = 0;

        this.currAng = 0;
        this.prevAng = this.angle + (this.slice * 0.5) - this.clockOffset;

        this.notCounted = true;

        this.minuteCountOn = true;
        this.inMotion = true;

        // this.currTime = p5.second();
        this.currSec = 0;
        // this.newCurrTime = (this.currTime + this.counter) % 60;

        // this.currMin = p5.minute();
        this.currMin = 0;
        // this.newCurrMin = (this.currMin + this.minCounter) % 60;

        this.currHr = 0;

        this.newCurrMin = 0;
        this.newCurrTime = 0;
        this.newCurrHr = 0;

        
    }
    
    initTime(initSec, initMin, initHr) {
        // this.initSec = initSec;
        // this.initMin = initMin;
        this.initHr = initHr;

        this.currHr = initHr + this.hrCounter;
        this.angle = (this.angle + ((this.slice * 0.5) * (this.initHr * 2)) + 360) % 360;
        this.prevAng = (this.angle + (this.slice * 0.5)) % 360;
    }

    clockDraw(){
        for (let a = 0 + (this.slice * 0.5); a < (360 + (this.slice * 0.5)); a += this.slice) {

            let ang = this.angle % (360);
    
            fill(255);
            
    
            if (ang >= a - + (this.slice * 0.5) && ang <= a  - (this.slice * 0.5) + this.slice) {
                fill('red');
            }
    
            arc(0, 0, this.w, this.h, a, a + this.slice, PIE)
    
        }

        fill(0);
        ellipse(0,0, this.w - 110, this.h - 55);

        // console.log('this is prev: ' + this.prevAng);
        // console.log('this is the current angle: ' + this.angle);


        console.log('current Hour: ' + this.currHr);
        console.log(this.hrCounter);

    }

    clockHandUpdate(){

        this.angle += this.angleV;
        this.angleV += this.angleA;
        this.angle =  this.angle % 360;

        
        this.currAng = floor(this.angle % 360);
        console.log(this.currAng)
    
            if (this.currAng >= this.prevAng && this.currAng <= this.prevAng + this.slice && this.inMotion){
                this.hrCounter += 1;
                this.prevAng = (this.prevAng + this.slice) % 360;
            }

    }

    clockShow(currSec, currMin) { //feed in calculations from other classes and their live updated times on min and sec
        this.currSec = currSec;
        this.currMin = currMin;

        this.newCurrHr = (this.currHr + this.hrCounter) % 24; // hr is only thing u need calculated in this class


        textSize(30);
        fill('green');
        textAlign(CENTER);

        text(this.newCurrHr + ':', -50, 10);
        text(this.currMin + ':', 0, 10);
        text(this.currSec, 50, 10);

        

    }

    setNeedleSpeed(timeSec){ 
        this.angleV = constrain(this.angleV, 0, 30);


        if (timeSec % 2 == 0) {
            this.angleA = 0.0005; // compltely arbitrary speed for needle. need edit.
            // this.angleA = 0.01;
        }

        if (!this.timeTraveling){
            this.angleV *= 0.98;
        }
    }
}