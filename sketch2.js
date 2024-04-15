let nSlice = 6;
let slice;
let angle;
let angleV;
let angleA;
let counter = 2;
let prevAng = 0;
let notCounted = true;

function setup(){
    createCanvas(800, 800);
    angleMode(DEGREES);
    // frameRate(50);
    slice = floor(180 / nSlice);
    angle = 0;
    angleV = 0;
    angleA = 0;
    
}



function mousePressed() {
    // angle = 360+ createVector(mouseX-200, mouseY-200).heading();
    holdA = angle + 360;  
    angleV = 0;
  }
  function mouseDragged() {
    angle = 360 + createVector(mouseX- width/2, mouseY- height/2).heading();
  }
  
  function mouseReleased() {
    // let newAngle = 360+ createVector(mouseX-200, mouseY-200).heading();
    angleV = -1*(angle-holdA) * 0.05;
  }

  

function draw(){
    background(50);

    translate(width/2, height/2);
    strokeWeight(5);

    stroke(255);

    for (a = 0 - (slice * 0.5); a < 360; a += slice) {

        let ang = angle % 360;

        fill(0);

        if (ang >= a && ang <= a + slice) {
            fill('red');
        }

        arc(0,0, width - 100, height - 100, a, a + slice, PIE)

    }


    fill(0);
    ellipse(0,0, 550);
    

    rotate(angle);
    ellipse(200,0,30);


    angle += angleV;
    angleV += angleA;

    angleV *= 0.98;

    let currAng = floor(angle % 360) - (slice * 0.5);
    console.log(counter);
    console.log('this is currAng:', currAng);
    console.log('this is prevAng:', prevAng);


    

    if (angleV >= 8){
        if( currAng % 30 < 20){
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
        prevAng = (prevAng + 30) % 360;
    }

    strokeWeight(4);
    text(counter % 12 + 1, 0, 0);
    // text(currAng, 400,730);
    // text(prevAng, 400,760);
    

}