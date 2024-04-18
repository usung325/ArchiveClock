let masterClock;
let minuteClock;
let secClock;
let tempAng;


function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    background(0);

    masterClock = new MasterClock(6, 300, 300, 0.01, 350, 350);
    masterClock.initTime(second(), minute(), hour());

    minuteClock = new MinClock(30, 500, 500);

    secClock = new SecClock(50, 50);
    

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

    stroke(1);
    masterClock.setNeedleSpeed(second());

    translate(350, 350);
    strokeWeight(5);
    minuteClock.clockDraw(masterClock.angle);
    strokeWeight(25);
    masterClock.clockDraw();

    masterClock.clockShow(second(), minute()); // temporary, would be clockSec.currSec and clockMin.currMin as parameters in future
    masterClock.clockHandUpdate();


    strokeWeight(10);
    noStroke();
    secClock.clockDraw(0.05);


    rotate(masterClock.angle);

    stroke(0);
    strokeWeight(20);
    fill('red');
    ellipse(200,100,30);

}

