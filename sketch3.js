// 60 second clock

let nSlice = 30;
let sliceAng = 180 / nSlice;
let slice;
let angle;
let angleV;
let angleA;
let angleTemp;
let counter = 15;
let prevAng = 0;
let notCounted = true;

let currTime;
let inMotion = false;
let newCurrTime;
let currMin = 0;
let newCurrMin;
let minCounter = 0;
let minCountOn = true;

let currPressed = false;

let currTimeNeedleRotateOffset = 0;


function setup(){
    createCanvas(800, 800);
    angleMode(DEGREES);
    // frameRate(50);
    slice = floor(180 / nSlice);
    angle = 0;
    angleV = 0;
    angleA = 0;
    angleTemp = 0.01 / 5;
    
    
    
}



function mousePressed() {
    // angle = 360+ createVector(mouseX-200, mouseY-200).heading();
    currPressed = true;
    holdA = angle + 360;  
    angleV = 0;
  }
  function mouseDragged() {
    angle = 360 + createVector(mouseX- width/2, mouseY- height/2).heading();
  }
  
  function mouseReleased() {
    let newAngle = 360+ createVector(mouseX- width/2, mouseY- height/2).heading();
    angleV = -1*(newAngle-holdA) * 0.01;
    currPressed = false;
    
  }
  

function draw(){

    if (second() % 2 == 0){
        angleA = angleTemp;
    }


    angleV = constrain(angleV, 0,5);
    currTime = second();
    newCurrTime = (currTime + counter) % 60;
    currMin = minute();
    newCurrMin = (currMin + minCounter) % 60;

    
    if (newCurrTime == 0 && minCountOn){
        minCounter += 1;
        minCountOn = false;
    }

    else if (newCurrTime > 30){
        minCountOn = true;
    }


    background(0);
    
    translate(width/2, height/2);
    strokeWeight(10);
    rotate(currTimeNeedleRotateOffset);


    textAlign(RIGHT);
    textSize(50);
    noStroke();
    fill(255);
    text(newCurrMin,-350 + 20, 385);
    text(newCurrTime, -270 + 20, 385);
    text(':', -312, 383);

    stroke(0);

    for (a = 0 - (slice * 0.5); a < 360 - (slice * 0.5); a += slice) {

        let ang = angle % (360);

        fill(255);

        if (ang >= a && ang <= a + slice) {
            fill('red');
        }

        arc(0,0, width - 100, height - 100, a, a + slice, PIE)

    }
    


    fill(0);
    ellipse(0,0, 550);


    stroke(255);

    rotate(angle);
    // ellipse(200,0,30);


    angle += angleV;
    angleV += angleA;

    angleV *= 0.98;

    let currAng = floor(angle % (360)) - (slice * 0.5);
    console.log(counter);
    console.log('this is angleV:', angleV);
    console.log('this is currAng:', currAng);
    console.log('this is prevAng:', prevAng);


    

    if (angleV >= 8){
        if( currAng % sliceAng < sliceAng - 1){
            notCounted = true;
        }
        else {
            notCounted = false;
        }
    }
    else{

        notCounted = true;
    }

    if (currAng >= prevAng && currAng <= prevAng + slice && notCounted){
        counter += 1;
        prevAng = (prevAng + sliceAng) % 360;
        if (inMotion){
            currTime += 1; // NOT WORKING
        }
    }
    





    ////////////////////////////////////////////////////////////////////////

    if (angleV <= 0.05 ) {
        inMotion = false;
    }
    else {
        inMotion = true;
    }

    

    noStroke();
    textAlign(CENTER);
    fill(255);
    textSize(30);
    text(counter % 60, 310, 0);
    // text(currAng, 400,730);
    // text(prevAng, 400,760);

    

}