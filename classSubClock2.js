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
        this.newCurrSec = (0) + (360 - (0)) * (currSec - 0) / (59 - 0);
        this.currSec = currSec;
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

        rectMode(CENTER);
        fill(255)
        rect(0,0,10,40);
        rect(0,0,40,10);
    }

    clockUpdate(counter){

        this.tempCounter = counter;
        let newCounts = counter - this.counter;

        for(let i = 0; i < newCounts; i++){
            this.angle += (this.slice);
        }

        this.counter = this.tempCounter;

        // this.counter = counter;
        this.newCurrSec = this.newCurrSec + counter;
        // this.counter += 1;

    }
}