class MinClock {
    constructor(n, w, h) {
        this.n = n;
        this.w = w;
        this.h = h;

        this.slice = floor(180 / n);

        this.counter = 0;
        this.angle = 0;
        this.tempCounter = 0;
        this.currMin = 0;

        this.newCurrMin = 0;

    }

    initClock(currMinute){
        this.angle = (((currMinute - 1) * this.slice) + (this.slice * 0.5) + 270) % 360;
        this.currMin = currMinute;
    }

    clockDraw(){
        
        for (let a = 0 + (this.slice * 0.5); a < (360 + (this.slice * 0.5)); a += this.slice) { 
            
            let ang = this.angle  % 360;

            fill(255);
            
    
            if (ang >= a - + (this.slice * 0.5) && ang <= a  - (this.slice * 0.5) + this.slice) {
                fill('red');
            }
    
            arc(0, 0, this.w, this.h, a, a + this.slice, PIE)
    
        }
        blendMode(REMOVE);
        fill(0);

        for(let i =45; i < 360+45; i += 6){
            rotate(i);
            rect(0,0,1000,15);
            rotate(-i);
        }


        // strokeWeight(2);
        // stroke('white')
        ellipse(0,0, this.w - 200, this.h - 200); //ellipse(0,0, this.w - 20, this.h - 100);
        blendMode(BLEND);
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