//this sketch uses classClock2.js


let clock1;
let tempAng;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    background(0);


    clock1 = new Clock2(30, 600, 600, 0.02);
    clock1.initTime(second(), minute(), hour());

    clockMin = new Clock2(30, 300, 300, 0.01);
    clockMin.initTime(second(), minute(), hour());
}

function mousePressed(){
    tempAng = clock1.angle + 360;
    clock1.angleV = 0;
}

function mouseDragged() {
    clock1.angle = 360 + createVector(mouseX - clock1.xOffset, mouseY - clock1.yOffset).heading();
}

function mouseReleased(){
    let newAngle = 360 + createVector(mouseX - clock1.xOffset, mouseY - clock1.yOffset).heading();
    clock1.angleV = -1 * (newAngle - tempAng) * 0.01;
    console.log('work');
    
}

function keyPressed() {
    if (key == 'r') {
        clock1.angleA = 1;
        clock1.timeTraveling = true;
    }
    
    if (key == 'l') {
        clock1.timeTraveling = false;
    }
}


function draw() {

    clock1.high_NeedleSpeedModify(second());
    
    
    clock1.draw(350, 350);
    
    clockMin.draw(0,0);
    // clockMin.clockShow(0,0);
    clockMin.clockUpdate('minute', clock1.newCurrTime);
    
    clock1.clockShow(350, 350);
    clock1.clockUpdate('second', 0);

    // clockMin.draw(0, 0);
    // clockMin.cloockShow(0, 0);
    // clockMin.clockUpdate();

    // translate(width/2, height/2);
    rotate(clock1.angle)
    fill(255,0,0);
    ellipse(200,10,20);


}
