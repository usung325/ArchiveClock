
let clock1;
let tempAng;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    background(0);


    clock1 = new Clock(6, 400, 400);
    clock1.initTime(second(), minute(), hour());
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

function draw() {

    clock1.high_NeedleSpeedModify(second());

    clock1.draw(350, 350);
    clock1.clockShow(350, 350);
    clock1.clockUpdate();

    // translate(width/2, height/2);
    rotate(clock1.angle)
    fill(255,0,0);
    ellipse(100,20,40);


}
