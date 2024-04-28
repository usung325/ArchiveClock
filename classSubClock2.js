class SecClock {
    constructor(w, h) {
        // this.n = n;
        this.w = w;
        this.h = h;


        // this.slice = floor(180 / n);
        this.counter = 0;
        this.angle = 0;
        this.tempCounter = 0;
        this.currSec = 0;

        this.newCurrSec = 0;

    }

    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    initClock(currSec){
        this.newCurrSec = (0) + (360 - (0)) * (currSec - 0) / (59 - 0)
    }

    clockDraw() {
        // noStroke();

        // let newCurrSec =  (0) + (360 - (0)) * (this.angle - 0) / (59 - 0); //re-map formula
        fill(255)
        if (this.newCurrSec != 0){
            arc(0, 0, this.w, this.h, -90, -90 + (this.newCurrSec));
        }
        else {
            ellipse(0,0,this.w, this.h);
        }


        fill(0);
        ellipse(0, 0, this.w - 20, this.h - 20);


    }

    clockUpdate(counter){
        this.counter = counter;
        this.newCurrSec = counter + this.newCurrSec;

    }
}