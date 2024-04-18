class MinClock {
    constructor(n, w, h) {
        this.n = n;
        this.w = w;
        this.h = h;

        this.slice = floor(180 / n);

    }

    clockDraw(currMinuteAngle){
        for (let a = 0 + (this.slice * 0.5); a < (360 + (this.slice * 0.5)); a += this.slice) {


            
            let ang = currMinuteAngle;

            fill(255);
            
    
            if (ang >= a - + (this.slice * 0.5) && ang <= a  - (this.slice * 0.5) + this.slice) {
                fill('red');
            }
    
            arc(0, 0, this.w, this.h, a, a + this.slice, PIE)
    
        }

        fill(0);
        // strokeWeight(2);
        // stroke('white')
        ellipse(0,0, this.w - 20, this.h - 100);

    }
}