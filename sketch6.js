let masterClock;
let minuteClock;
let secClock;
let tempAng;

let projIndex = 0;
var gif1;
var gif2;
var vid;


function preload() {
    // img = loadImage("small_cow.png");

    // gif = createImg("/patternLive.gif");
    // vid = createVideo('boidVid.mp4');


    // img.loadPixels();
    // gif1 = loadImage("/patternLive.gif");
    // gif2 = loadImage("/pattern.gif");
    gif1 = createImg("/patternLive.gif");
    // gif1.position(width, height);
    gif1.hide()
    gif2 = createImg("/pattern.gif");
    // gif2.position(width/2, height/2);
    gif2.hide()
}


function setup() {


    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);

    // angleVInit starts w arbitrary value
    masterClock = new MasterClock(6, 500, 500, 0.01, 700, 600);
    minuteClock = new MinClock(30, 900, 900);
    secClock = new SecClock(200, 200);
    minuteClock.initClock(minute());
    secClock.initClock(second());


    masterClock.initTime(second(), minute(), hour());
}


function mousePressed() {
    tempAng = masterClock.angle + 360;
    masterClock.angleV = 0;
}

function mouseDragged() {
    masterClock.angle = 360 + createVector(mouseX - masterClock.xOffset, mouseY - masterClock.yOffset).heading();
}

function mouseReleased() {
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
    clear();

    textSize(25);
    fill('white');
    textAlign(LEFT)
    text('Project: ', 40, 140 - 80);
    text('Cellular Pattern Generator', 40, 140 + 35 - 80);


    text('Project Time: ', 40, 140 - 80 + 900 + 50);
    text('14 Days', 40, 140 + 35 - 80 + 900 + 50);

    // vid.hide();
    //     vid.play();
    //     image(vid,0,100,500,500);

    // background(0);

    stroke(1);
    masterClock.setNeedleSpeed(second());

    translate(width / 2, height / 2);

    /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE ///

    if(masterClock.currDay == 1){
        gif1.hide();
        gif2.hide();
    }

    else if(masterClock.currDay >= 10){
        gif1.hide();
        gif2.position(450, 30);
        gif2.size(1000, 1000);
        gif2.show();
    }
    
    else if(masterClock.currDay >= 5){
        // image(gif1, 0, 0);
        gif1.position(450, 30);
        gif1.size(1000, 1000);
        gif1.show();
        // gif = createImg("/pattern.gif");
        // gif.position(440, 0);
        
    }

    /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE /// /// UPDATE GIF EVENTS EHRE ///


    blendMode(REMOVE);
    strokeWeight(5);
    noStroke();
    blendMode(BLEND);

    minuteClock.clockDraw();

    blendMode(REMOVE);
    strokeWeight(25);
    noStroke();
    blendMode(BLEND);



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
    // console.log('min: ' + minCount);
    // console.log('sec: ' + secCount);


    rotate(masterClock.angle);

    stroke(0);
    noStroke();
    fill('red');
    ellipse(140, 70, 20);


    // if (masterClock.currDay >= 30) {
    //     gif = createImg("/patternLive.gif");
    //     gif.position(440, 0);
    //     gif.size(1000, 'auto');
    //     // gif.hide();
    // }

    // else if(masterClock.currDay >= 20){
    //     gif = createImg("/boid.gif");
    //     gif.position(440, 0);
    //     gif.size(1000, 'auto');
    // }

    


    // fill(255, 0, 0);
    // ellipse(0, 0, 400);


    // if(masterClock.currDay >= 50){
    //     gif = createImg("/pattern.gif");
    //     gif.position(475, 35);
    //     gif.size(900,910);
    // }
    // else {
    //     gif = createImg("/patternLive.gif");
    //     gif.position(100, 0);
    //     gif.size(1200,'auto');
    // }


}

