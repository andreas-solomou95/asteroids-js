const FPS = 30;
let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const shipDiameter = 20;
const shipState = {
    x: window.innerWidth * 0.5 - shipDiameter,
    y: window.innerHeight * 0.5 - shipDiameter
};

setInterval(update, 1000 / FPS);

function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    space();
    ship();
    context.restore();
    context.translate(0, 0);
    thruster();

    renderedFrame++;
}

function space(color = 'black') {
    context.fillStyle = color;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.save();
}

function ship() {
    context.beginPath();
    context.moveTo(...translate(0, 0));
    context.lineTo(...translate(2 * shipDiameter, shipDiameter));
    context.lineTo(...translate(0, 2 * shipDiameter));
    context.lineTo(...translate(0.7 * shipDiameter, shipDiameter));
    context.lineTo(...translate(0, 0));
    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.stroke();
    context.save();
}

function thruster(){
    const keyframe = renderedFrame * 4 % 2.3;
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(...translate(-0.2 * shipDiameter, 0.2 * shipDiameter));
    context.lineTo(...translate(-0.8 * keyframe * shipDiameter, shipDiameter));
    context.lineTo(...translate(-0.2 * shipDiameter, 1.8 * shipDiameter));
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();
}

const translate = (offsetX, offsetY) => [shipState.x + offsetX, shipState.y + offsetY];
