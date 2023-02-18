import { space, ship, thruster } from './assets.js';
import { drawLasers, fireLaser } from './laser.js';
import { FPS, SHIP_SPEC } from './variables.js';
import { toRads } from './utils.js';

let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('frameCounter');

export let currentX = SHIP_SPEC.x;
export let currentY = SHIP_SPEC.y;
export let currentAngle = SHIP_SPEC.a;
export let laserCollection = [];

const keydown = (event) => keys[event.keyCode] = event.keyCode;
const keyup = (event) => keys[event.keyCode] = false;

window.requestAnimationFrame(update);
// setInterval(update, 1000 / FPS);

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

const keys = new Array();
let fire = false;

let start = Date.now();
let minFrametime = Number.MAX_SAFE_INTEGER;
let maxFrametime = Number.MIN_SAFE_INTEGER;

function update() {
    let stop = Date.now();
    const frametime = stop - start;
    start = stop;
    minFrametime = Math.min(frametime, minFrametime);
    maxFrametime = Math.max(frametime, maxFrametime);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let inlineConsole = `
    ${canvas.width} x ${canvas.height}<br>
    Min Frametime: ${minFrametime}ms <br>
    Max Frametime: ${maxFrametime}ms <br>`;

    // inlineConsole += 'Lasers: <br>';
    // laserCollection.forEach(([x, y, a]) => {
    //     inlineConsole += `[${Math.round(x)}, ${Math.round(y)}, ${Math.round(a)}rad]<br>`;
    // })
    counter.innerHTML = inlineConsole;


    handleKeyEvents();
    // space(canvas, ctx);
    ship(ctx, renderedFrame);
    thruster(ctx, renderedFrame, fire);
    laserCollection = drawLasers(renderedFrame, ctx, laserCollection, canvas.width, canvas.height);

    renderedFrame++;

    window.requestAnimationFrame(update);
}

function handleKeyEvents() {
    // laser
    if (keys[32]) {
        laserCollection = fireLaser(currentX, currentY, currentAngle, laserCollection);
    }
    // turn left
    if (keys[37] || keys[65]) {
        currentAngle += SHIP_SPEC.angV;
    }
    // turn right
    if (keys[39] || keys[68]) {
        currentAngle -= SHIP_SPEC.angV;
    }
    // move forward
    if (keys[38] || keys[87]) {
        currentX += SHIP_SPEC.dv * Math.cos(toRads(currentAngle));
        currentY -= SHIP_SPEC.dv * Math.sin(toRads(currentAngle));
        fire = true;
        return;
    }
    fire = false;
}