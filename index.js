const FPS = 30;
let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('frameCounter');

const toRads = (deg) => deg * (Math.PI / 180);

const shipSpec = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    r: 10,
    a: toRads(90)
}

setInterval(update, 1000 / FPS);

function update() {
    space();
    ship();
    thruster();

    counter.innerHTML = renderedFrame % FPS + '/' + FPS;
    renderedFrame++;
}

function space(color = 'black') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
}

function ship() {
    const x = shipSpec.x;
    const y = shipSpec.y;
    const radius = shipSpec.r;
    const angle = toRads(renderedFrame);

    ctx.beginPath();
    ctx.moveTo( // nose
        x - radius * (Math.cos(angle) - Math.sin(angle)),
        y + radius * (Math.sin(angle) + Math.cos(angle))
    );
    ctx.lineTo(
        x + radius * Math.cos(angle),
        y - radius * Math.sin(angle)
    );
    ctx.lineTo(
        x - radius * (Math.cos(angle) + Math.sin(angle)),
        y + radius * (Math.sin(angle) - Math.cos(angle))
    );
    ctx.lineTo(
        x - 1/2 * radius * (Math.cos(angle)),
        y + 1/2 * radius * (Math.sin(angle))
    );
    ctx.closePath();

    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor   = 'limegreen';
    ctx.strokeStyle = 'limegreen';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.save();
}

function thruster() {
    const x = shipSpec.x;
    const y = shipSpec.y;
    const radius = shipSpec.r;
    const angle = toRads(renderedFrame);

    const keyframe = renderedFrame % 2 + 1;
    console.log(keyframe);

    ctx.beginPath();
    ctx.moveTo(
        x - radius * (Math.cos(angle)),
        y + radius * (Math.sin(angle))
    );
    ctx.lineTo(
        x - keyframe * radius * (Math.cos(angle)),
        y + keyframe * radius * (Math.sin(angle))
    );

    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor   = 'red';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.save();
}