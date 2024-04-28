class SecClock {
    constructor(w, h) {
        // this.n = n;
        this.w = w;
        this.h = h;


        // this.slice = floor(180 / n);
        this.counter = 0;
        this.angle = 0;
        this.tempCounter = 0;
        this.currMin = 0;

        this.newCurrSec = 0;

    }

    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    clockDraw(currSec) {
        // noStroke();

        let newCurrSec =  (0) + (360 - (0)) * (currSec - 0) / (59 - 0); //re-map formula
        fill(255)
        if (currSec != 0){
            arc(0, 0, this.w, this.h, -90, -90 + (newCurrSec));
        }
        else {
            ellipse(0,0,this.w, this.h);
        }


        fill(0);
        ellipse(0, 0, this.w - 20, this.h - 20);


    }

    clockUpdate(counter){

        this.tempCounter = counter;
        let newCounts = counter - this.counter;
        // newCounts *= 5;
        // console.log('new counts of this.slice applied: ' + newCounts);

        // if(newCounts < 1) {
        //     // this.angle += 0.01; //completely arbitrary
        //     return;
        // }

        // else {
            for(let i = 0; i < newCounts; i++){
                this.angle += (this.slice);
            }
    
            this.counter = this.tempCounter;
        // }

    }
}