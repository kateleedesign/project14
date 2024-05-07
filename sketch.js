//Kate Lee
//katelee
//Section E
//Works Cited: YouTube link to blur filter 'https://youtu.be/s7CTmJt0NfI?feature=shared'

let i = 0;
let detail = 0.6;
let increment = 0.002;
let currentPenguinIndex = 0;

var x = 300;
var y = 300;
var diffx = 0;
var diffy = 0;

var Waves = [];
let habitatImage;

let penguinImages = [
    "https://i.imgur.com/nifoS8c.pngg",
    "https://i.imgur.com/AHR34YU.png",
    "https://i.imgur.com/oOWMiom.png",
    "https://i.imgur.com/1uGek9R.png",
    "https://i.imgur.com/vsKQEd5.png",
    "https://i.imgur.com/qYzIjRv.png",
    "https://i.imgur.com/qYzIjRv.png"
    ];
var messages = [
    "",
    "Penguins in Antarctica have no land-based predators.",
    "Emperor penguins spend their entire lives around the Antarctic ice.",
    "Because of the receding sea ice,",
    "thousands of emperor penguins in the Western Antarctica lost their chicks.",
    "...like this little guy.",
    ""
];

function preload() {
    habitatImage = loadImage("https://i.imgur.com/w24NLXz.jpeg");

    for (let j = 0; j < 7; j++) {
        penguinImages[j] = loadImage(penguinImages[j]);
    }
}

function setup() {
    createCanvas(640, 400);
    imageMode(CENTER);

    for (var j = 0; j < 1; j++) {
        var mx = random(100, 200);
        Waves[j] = makeWave(mx);
    }
}

function draw() {
  // Ombre background: doesn't show on screen but for some reason needs to be in for my code to work
    color_1 = color("A4F4F9");
    color_2 = color("23AEBA");

    for (var k = 0; k < height; k++) {
        var n = map(k, 0, height, 0, 1);
        var color_3 = lerpColor(color_1, color_2, n);
        stroke(color_3);
        line(0, k, width, k);
    }

    // Apply blur filter only to the habitatImage
    let amount = map(mouseX, 0, width, 1, 12);
    if (amount < 0) amount = 0;
    drawingContext.filter = "blur(" + str(amount) + "px)";
    image(habitatImage, width / 2, height / 2, 640, 360);
    drawingContext.filter = "none"; // Reset filter

    magnifyingGlass();
    textMessages();
    penguinShow();
    updateWaves();
    addWaves();
}

function magnifyingGlass() {
    noStroke();
    fill(252, 86, 3);

    diffx = mouseX - x;
    diffy = mouseY - y;
    x = x + 0.1 * diffx;
    y = y + 0.1 * diffy;
    ellipse(x, y, 100, 100);
}

function textMessages() {
    textSize(60);
    text(messages[i], 25, 25, 620, 380);
    drawingContext.filter = "none";
}

function penguinShow() {
    image(penguinImages[currentPenguinIndex], width / 2, height / 2, 640, 360);
}

function mousePressed() {
    i = (i + 1) % messages.length;

    // Change the current penguin image index
    currentPenguinIndex = (currentPenguinIndex + 1) % penguinImages.length;
}

function updateWaves() {
    // Update the Wave's positions, and display them.
    for (var i = 0; i < Waves.length; i++) {
        Waves[i].move();
        Waves[i].display();
    }
}

function addWaves() {
    var newWaveLikelihood = 0.05;
    if (random(0, 2) < newWaveLikelihood) {
        Waves.push(makeWave(width));
    }
}

function WaveMove() {
    this.x += this.speed;
}

function WaveDisplay() {
    fill(random(22, 28), random(22, 28), random(22, 28), 30);
    noStroke();
    push();
    translate(this.x, height);
    triangle(0, 0, this.width / 2, -this.height, this.width, 0);
    pop();
}

function makeWave(birthLocationX) {
    var Wave = {
        x: birthLocationX,
        width: random(450, 600),
        height: random(20, 150),
        speed: -0.5,
        move: WaveMove,
        display: WaveDisplay
    };
    return Wave;
}
