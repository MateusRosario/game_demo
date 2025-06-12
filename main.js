let balls = [];

const context = {
    windowX: undefined,
    windowY: undefined,
    screenWidth: undefined,
    screenHeight: undefined,
}

// Define colors and names for each ball
const ballColors = [
    [255, 0, 0],    // Red
    [0, 0, 255],    // Blue
    [255, 255, 0],  // Yellow
    [255, 165, 0],  // Orange
    [128, 0, 128]   // Purple
];

const ballNames = [
    "João",
    "Mateus",
    "Raquel",
    "Arthur",
    "Guilherme"
];

let gravity = 0.5;
let bounce = 0.7;
let repelStrength = 5; // Adjust for stronger/weaker repulsion

// p5.js sketch to create a canvas and draw a ball in the center
function setup() {
    context.windowX = window.screenLeft
    context.windowY = window.screenTop;
    context.screenWidth = window.screen.availWidth;
    context.screenHeight = window.screen.availHeight;
    console.log(context.screenWidth, context.screenHeight);
    
    createCanvas(windowWidth, windowHeight).parent(document.body);

    for (let i = 1; i <= 5; i++) {
        balls.push(new Ball(i, context, i * 50, 0, ballColors[i - 1], ballNames[i - 1]));
    }
}

// p5.js windowResized event
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    context.windowX = window.screenLeft
    context.windowY = window.screenTop;
    
    background(255);
    fill(80, 185, 49);
    stroke(0);

    // Apply repulsion between balls
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let b1 = balls[i];
            let b2 = balls[j];
            let dx = b2.posicaoHorizontal - b1.posicaoHorizontal;
            let dy = b2.posicaoVertical - b1.posicaoVertical;
            let distSq = dx * dx + dy * dy;
            let minDist = (b1.ballTam + b2.ballTam) / 2;
            if (distSq < minDist * minDist && distSq > 0) {
                let distVal = sqrt(distSq);
                let overlap = minDist - distVal;
                b1.addIsTouching(b2);
                b2.addIsTouching(b1);

                // Normalize direction
                let nx = dx / distVal;
                let ny = dy / distVal;
                // Push balls apart
                b1.posicaoHorizontal -= nx * overlap / 2;
                b1.posicaoVertical -= ny * overlap / 2;
                b2.posicaoHorizontal += nx * overlap / 2;
                b2.posicaoVertical += ny * overlap / 2;
                // Add repulsion velocity
                let force = repelStrength / distVal;
                b1.velocityX -= nx * force;
                b1.velocityY -= ny * force;
                b2.velocityX += nx * force;
                b2.velocityY += ny * force;
            } else {
                b1.removeIsTouching(b2);
                b2.removeIsTouching(b1);
            }
        }
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw(context);
    }
}

function mousePressed() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].mousePressed();
    }
}

function mouseDragged() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].mouseDragged(context);
    }
}

function mouseReleased() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].mouseReleased();
    }
}