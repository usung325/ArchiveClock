class MasterClock {
    constructor(n, w, h, angleVInit, xOffset, yOffset) {
        this.i = 0;
        this.n = n;
        this.w = w;
        this.h = h;
        this.timeTraveling = false;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.secCounter = 0;
        this.minCounter = 0;
        this.hrCounter = 0;

        this.initHr = 0;
        this.initMin = 0;
        this.initSec = 0;

        this.sliceOf60 = floor(180 / 30);
        this.slice = floor(180 / n);


        this.clockOffset = this.slice; // this is just for clock to be shifted a little bit
        this.angle = 0 - (this.slice * (n / 2)) + (this.slice * 0.5) - this.clockOffset;
        this.angleV = angleVInit;
        this.angleA = 0;

        this.currAng = 0;
        this.tempCounter = 0;
        this.prevAng = this.angle + (this.slice * 0.5) - this.clockOffset;
        // this.tempPrevAng = this.prevAng;

        this.notCounted = true;

        this.minuteCountOn = true;
        this.inMotion = true;

        // this.currSec = p5.second();
        this.currSec = 0;


        // this.currMin = p5.minute();
        this.currMin = 0;
        // this.newCurrMin = (this.currMin + this.minCounter) % 60;

        this.currHr = 0;

        this.newCurrMin = 0;
        this.newcurrSec = 0;
        this.newCurrHr = 0;

        /////////// for clockSubUpdate()

        this.tempAngle = 0;
        this.prevAngle = -1;

        this.currDay = 0;
        this.isDayCounted = false;


    }

    initTime(initSec, initMin, initHr) {
        // this.initSec = initSec;
        this.initMin = initMin;
        this.initHr = initHr;

        this.currSec = initSec + this.secCounter;
        this.currMin = initMin + this.minCounter;

        // this.currSec = initSec + this.secCounter;
        this.currHr = initHr + this.hrCounter;
        this.angle = (((initHr - 1) * this.slice) + (this.slice * 0.5) + 270) % 360 //(this.angle + ((this.slice * 0.5) * (this.initHr * 2)) + 360) % 360;
        this.prevAng = (this.angle + (this.slice * 0.5)) % 360;
        this.tempPrevAng = this.prevAng;
    }

    clockDraw() {
        for (let a = 0 + (this.slice * 0.5); a < (360 + (this.slice * 0.5)); a += this.slice) {

            let ang = this.angle % (360);

            fill(255);


            if (ang >= a - + (this.slice * 0.5) && ang <= a - (this.slice * 0.5) + this.slice) {
                fill('red');
            }
            // strokeWeight(60)
            arc(0, 0, this.w, this.h, a, a + this.slice, PIE)

        }
        blendMode(REMOVE);

        rotate(45);
        rect(0,0,500,10);
        rotate(-45);

        rotate(75);
        rect(0,0,500,10);
        rotate(-75);

        rotate(105);
        rect(0,0,500,10);
        rotate(-105);

        rotate(135);
        rect(0,0,500,10);
        rotate(-135);

        rotate(165);
        rect(0,0,500,10);
        rotate(-165);

        rotate(195);
        rect(0,0,500,10);
        rotate(-195);


        fill(0);
        ellipse(0, 0, this.w - 130, this.h - 130);  //ellipse(0, 0, this.w - 110, this.h - 55);
        blendMode(BLEND);
        // console.log('this is prev: ' + this.prevAng);
        // console.log('this is the current angle: ' + this.angle);


        // console.log('current Hour: ' + this.currHr);
        // console.log(this.hrCounter);
        
        

    }

    clockHandUpdate() {

        this.angle += this.angleV;
        this.angleV += this.angleA;
        this.angle = this.angle % 360;

        this.currAng = floor(this.angle % 360);
        // console.log(this.currAng)

        if (this.currAng >= this.prevAng && this.currAng <= this.prevAng + this.slice && this.inMotion) {
            this.hrCounter += 1;
            this.prevAng = (this.prevAng + this.slice) % 360;
            
        }


        // this.newCurrSec = (this.currSec + this.secCounter) % 60;

    }

    clockShow(secCounter, minCounter) { //feed in calculations from other classes and their live updated times on min and sec
        
        this.minCounter = minCounter
        this.secCounter = secCounter;

        this.newCurrHr = (this.currHr + this.hrCounter) % 24; // hr is only thing u need calculated in this class
        this.newCurrSec = (this.currSec + this.secCounter) % 60;
        this.newCurrMin = (this.currMin + this.minCounter) % 60;

        textSize(100);
        fill('white');
        textAlign(RIGHT);

        // fill(0)
        // rect(0,500,200);
        text(this.newCurrHr + ':', -50 + 500 + 100, 400 + 80);
        text(this.newCurrMin + ':' , 0 + 600 + 100, 400 + 80);
        text(this.newCurrSec, 50 + 680 + 100, 400 + 80);

        this.currDay = (int((this.hrCounter + this.initHr) / (24))) % 84 + 1

        textSize(50);
        text('day: ' + this.currDay + '/84', 830, 380);
        
    }


    setNeedleSpeed(timeSec) {
        this.angleV = constrain(this.angleV, 0, 29);


        if (timeSec % 2 == 0) {
            this.angleA = 0.005; // compltely arbitrary speed for needle. need edit.
            // this.angleA = 0.01;
        }

        if (!this.timeTraveling) {
            this.angleV *= 0.98;
        }
    }

    updateSubClock(counter, mode) {
        // this only works if this.angle range is from 0-360.
        //if not, then ratio does not work correctly.
        // now fixed by using this.currAng.
        if (this.prevAngle == -1) {
            this.tempAngle = this.currAng;
            this.prevAngle = this.tempAngle;
        }

        else {

            this.prevAngle = this.tempAngle;
            this.tempAngle = this.currAng;

            let angDiff = (this.currAng - this.prevAngle + 360) % 360;

            // console.log('ANGLEDIFF: ' + angDiff);
            // console.log('PREVANGLE: ' + this.prevAngle);



            if (mode == 'minutes') {
                counter += (60 * ((angDiff / (this.slice))));
                // console.log('counter: ' + counter );
            }
        }

        return counter;
    }

    updateSubClock2(counter, mode) {

        // counter *= 60

        return counter;
    }


    updateClockSeconds() { // this was a test, DON'T USE



        if (this.inMotion) {

            this.tempCounter += 1;
            // console.log('working')
            // console.log('tempCounter: ' + this.tempCounter);
            // console.log('tempPrevAng: ' + this.tempPrevAng);

            if (this.angle >= this.tempPrevAng) {

                let updateInt = floor(3600 / this.tempCounter); // logical error

                if (this.i <= this.tempCounter) {
                    this.secCounter += updateInt; // not calculating correctly
                    this.i++
                }
                else {
                    this.tempPrevAng = this.prevAng;
                    this.i = 0;
                }
                // this.tempCounter = 0;
            }
        }

        // wrong approach, need to update values LIVE based on this.angle
        // since this.angle clips/jumps, we can calculate based on difference from 
        // current this.angle and past this.angle & add every time they change.



    }

}