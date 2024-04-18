class SecClock {
    constructor(w, h) {
        // this.n = n;
        this.w = w;
        this.h = h;


        // this.slice = floor(180 / n);

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
}