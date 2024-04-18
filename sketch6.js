let masterClock;
let tempAng;


function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    background(0);

    masterClock = new MasterClock(6, 600, 600, 0.1, 350, 350);
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

    masterClock.setNeedleSpeed(second());

    translate(350, 350);
    strokeWeight(25);
    masterClock.clockDraw();
    masterClock.clockShow(second(), minute()); // temporary, would be clockSec.currSec and clockMin.currMin as parameters in future
    masterClock.clockHandUpdate();


    rotate(masterClock.angle);

    fill('red');
    ellipse(200,100,30);

}

