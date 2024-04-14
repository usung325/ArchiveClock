let angle = 0.01;
let angleV = 0;
let angleA = 0;
let numSlice = 30;
let angleT = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

let holdA = 0;

function mousePressed() {
  angle = TWO_PI+ createVector(mouseX-200, mouseY-200).heading();
  holdA = angle + TWO_PI;  
  angleV = 0;
}
function mouseDragged() {
  angle = TWO_PI + createVector(mouseX-200, mouseY-200).heading();
}

function mouseReleased() {
  let newAngle = TWO_PI+ createVector(mouseX-200, mouseY-200).heading();
  angleV = -1*(newAngle-holdA) * 0.05;
}

function draw() {
  angleT = (millis() % 1) * 0.0039;
  

  // angleA = map(mouseX, 0, width, -0.01, 0.01);
  // angleV = constrain(angleV, -0.2, 0.2);


  background(0);
  translate(200, 200);
  
  let i = 0;
  for (let a = 0 + ((PI / numSlice) * 0.5); a < TWO_PI ; a += PI / numSlice) {
    noFill();
    stroke(255);
    strokeWeight(2);
    let ang = angle % TWO_PI;
    if (ang >= a && ang <= a + PI/numSlice) {
      fill(94, 201, 247);
    }
    
//     else if (ang > a && ang <= (a + PI/numSlice) + 0.5) {
//       fill(94, 201, 247,90);
//     }
    arc(0, 0, 400, 400, a , a + PI / numSlice, PIE);
    // i++;
  }


  noStroke();
  rectMode(CENTER);
  rotate(angle);
  fill(0);
  ellipse(0, 0, 8, 8);
  
  
  // rect(0, 0, 256, 16);
  stroke('white');
  ellipse(0,0, 340);
  
  
  translate(110,0);
  fill(255);
  // triangle(32, -8, 32, 8, 43, 0);
  // rect(-128, 0, 32, 48);
  
  
  


  angle += angleV;
  angle += angleT;
  // angleV += angleA;
  angleV *= 0.98;
  
  strokeWeight(1);

  text(second(), 69,3)
  
  
  
  


}