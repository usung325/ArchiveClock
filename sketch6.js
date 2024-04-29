let masterClock;
let minuteClock;
let secClock;
let tempAng;


function setup() {
    createCanvas(1200, 1200);
    angleMode(DEGREES);
    
    // angleVInit starts w arbitrary value
    masterClock = new MasterClock(6, 500, 500, 0.01, 700, 600);
    minuteClock = new MinClock(30, 800, 800);
    secClock = new SecClock(200, 200);
    minuteClock.initClock(minute());
    secClock.initClock(second());

    
    masterClock.initTime(second(), minute(), hour());
}


function mousePressed(){
    tempAng = masterClock.angle + 360;
    masterClock.angleV = 0;
}

function mouseDragged() {
    masterClock.angle = 360 + createVector(mouseX - masterClock.xOffset, mouseY - masterClock.yOffset).heading();
}

function mouseReleased(){
    let newAngle = 360 + createVector(mouseX - masterClock.xOffset, mouseY - masterClock.yOffset).heading();
    masterClock.angleV = -1 * (newAngle - tempAng) * 0.01;
}

function keyPressed() {
    if (key == 'r') {
        masterClock.angleA = 1;
        masterClock.timeTraveling = true;
        
    }
    
    if (key == 'l') {
        masterClock.timeTraveling = false;
    }
}

function draw() {
    background(0);

    stroke(1);
    masterClock.setNeedleSpeed(second());

    translate(width/2, height/2);
    strokeWeight(5);
    
    minuteClock.clockDraw();
    strokeWeight(25);
    masterClock.clockDraw();
    
    
    noStroke();
    masterClock.clockShow(secClock.counter, minuteClock.counter); // temporary, would be clockSec.currSec and clockMin.currMin as parameters in future
    masterClock.clockHandUpdate();
    
    let minCount = masterClock.updateSubClock(minuteClock.counter, 'minutes');
    minuteClock.clockUpdate(minCount);
    
    // masterClock.updateClockSeconds();
    
    
    strokeWeight(10);
    noStroke();
    secClock.clockDraw();

    let secCount = masterClock.updateSubClock2(minuteClock.counter, 'seconds');
    secClock.clockUpdate(secCount); // this seconds need to loop 60 times per minute.
    
    // console.log(masterClock.currSec);
    console.log('min: ' + minCount);
    console.log('sec: ' + secCount);


    rotate(masterClock.angle);

    stroke(0);
    strokeWeight(2);
    fill('red');
    ellipse(140,70,20);

}

