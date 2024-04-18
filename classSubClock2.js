class SecClock {
    constructor(w, h) {
        // this.n = n;
        this.w = w;
        this.h = h;
        this.a = 1;

        // this.slice = floor(180 / n);

    }

    clockDraw(secondInterval) {
        // noStroke();


        fill(255)
        arc(0, 0, this.w, this.h, -90, -90 + (3 * this.a));


        fill(0);
        ellipse(0, 0, this.w - 20, this.h - 20);

        this.a += secondInterval;
    }
}