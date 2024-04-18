class Clock {
    constructor (n, w, h, angleVInit){
        this.n = n;
        this.w = w;
        this.h = h;
        this.timeTraveling = false;

        this.xOffset = 0;
        this.yOffset = 0;

        this.counter = 0;
        this.minCounter = 0;
        this.hrCounter = 0;

        this.initHr = 0;
        this.initMin = 0;
        this.initSec = 0;

        this.sliceOf60 = floor(180 / 30);
        this.slice = floor(180 / n);
        this.angle = 0 - (this.slice * (n/2));
        this.angleV = angleVInit;
        this.angleA = 0;

        this.currAng = 0;
        this.prevAng = this.angle + (this.slice * 0.5);

        this.notCounted = true;

        this.minuteCountOn = true;
        this.inMotion = true;

        // this.currTime = p5.second();
        this.currTime = 0;
        // this.newCurrTime = (this.currTime + this.counter) % 60;

        // this.currMin = p5.minute();
        this.currMin = 0;
        // this.newCurrMin = (this.currMin + this.minCounter) % 60;

        this.currHr = 0;

        this.newCurrMin = 0;
        this.newCurrTime = 0;
        this.newCurrHr = 0;

        
    }

    initTime(initSec, initMin, initHr){

        this.initSec = initSec;
        this.initMin = initMin;
        this.initHr = initHr;

        this.currTime = initSec + this.counter;
        this.currMin = initMin + this.minCounter;
        this.currHr = initHr + this.hrCounter;

        this.angle = (this.angle + ((this.sliceOf60 * 0.5) * (this.initSec * 2)) + 360) % 360;
        this.prevAng = this.angle + (this.slice * 0.5);
        
    }

    draw(xOffset, yOffset){
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        translate(xOffset, yOffset);
        for (let a = 0 + (this.slice * 0.5); a < (360 + (this.slice * 0.5)); a += this.slice) {

            let ang = this.angle % (360);
    
            fill(255);
    
            if (ang >= a - + (this.slice * 0.5) && ang <= a  - (this.slice * 0.5) + this.slice) {
                fill('red');
            }
    
            arc(0, 0, this.w, this.h, a, a + this.slice, PIE)
    
        }

        fill(0);
        ellipse(0,0, this.w - 90, this.h - 90)

        this.angle += this.angleV;
        this.angleV += this.angleA;

        this.angle =  this.angle % 360;


        //// //// //// DEBUGGING //// //// //// //// //// 

        // console.log(this.angle);
        // console.log('this is angleV:', this.angleV);
        // console.log('this is this.counter:' + this.counter);

        console.log('this is prev:' + this.prevAng);
        console.log(this.angle);

        //// //// //// DEBUGGING //// //// //// //// //// 
        
    }

    clockUpdate(MODE, seconds){

        if(MODE == 'second'){

            this.currAng = floor(this.angle % 360) + (this.slice * 0.5);
    
    
            if (this.currAng >= this.prevAng && this.currAng <= this.prevAng + this.slice && this.inMotion){
                
                this.counter += 1;
    
                if ( this.newCurrTime == 0 ){
                    this.minCounter += 1;
                }
    
                this.prevAng = (this.prevAng + this.slice) % 360;
            }

        }

        else if(MODE == 'minute'){
            this.currAng = floor(this.angle % 360) + (this.slice * 0.5);
    
    
            if (seconds == 0){
                
                this.counter += 1;
    
                if ( this.newCurrTime == 0 ){
                    this.minCounter += 1;
                    this.angleV = 0.1;
                }
    
                this.prevAng = (this.prevAng + this.slice) % 360;
            }

            this.newCurrTime = seconds;
        }

    }

    high_NeedleSpeedModify(timeSec){
        this.angleV = constrain(this.angleV, 0, 6);


        if (timeSec % 2 == 0) {
            this.angleA = 6 / (1200 * 2.5);
            // this.angleA = 0.01;
        }

        if (!this.timeTraveling){
            this.angleV *= 0.98;
        }
    }

    clockShow(xOffset, yOffset){
        // translate(xOffset, yOffset); // do not remove. make a project with this as a painting method
        fill('green');
        // ellipse(0,0,100);

        textSize(30);
        textAlign(CENTER);
        this.newCurrMin = (this.currMin + this.minCounter) % 60;
        this.newCurrTime = (this.currTime + this.counter) % 60;
        this.newCurrHr = (this.currHr + this.hrCounter) % 12;

        text(this.newCurrHr + ':', -50, 0);
        text(this.newCurrMin + ':', 0, 0);
        text(this.newCurrTime, 50, 0);

    }


}