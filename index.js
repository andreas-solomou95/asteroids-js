import { space, ship, thruster } from './assets.js';
import { drawLasers, fireLaser } from './laser.js';
import { drawPolygons } from './polygons.js';
import { LASER_SPEC, SHIP_SPEC } from './variables.js';
import { toRads } from './utils.js';

let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('frameCounter');

export let currentX = SHIP_SPEC.x;
export let currentY = SHIP_SPEC.y;
export let currentAngle = SHIP_SPEC.a;
export let laserCollection = [];
export let polygonsCollection = [];

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
    space(canvas, ctx);
    polygonsCollection = drawPolygons(ctx, polygonsCollection, canvas.width, canvas.height);
    ship(ctx, renderedFrame);
    thruster(ctx, renderedFrame, fire);
    laserCollection = drawLasers(renderedFrame, ctx, laserCollection, canvas.width, canvas.height);

    renderedFrame++;

    window.requestAnimationFrame(update);
}

let lastFire = null;

function handleKeyEvents() {
    // laser
    if (keys[32]) {
        if (!lastFire || new Date().getTime() - lastFire >= 1000 / LASER_SPEC.rate) {
            lastFire = new Date().getTime();
            laserCollection = fireLaser(currentX, currentY, currentAngle, laserCollection, canvas);
        }
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
        if (currentX < 0) {
            currentX = canvas.width + currentX;
        }
        if (currentX > canvas.width) {
            currentX = currentX - canvas.width;
        }
        currentY -= SHIP_SPEC.dv * Math.sin(toRads(currentAngle));
        if (currentY < 0) {
            currentY = canvas.height + currentY;
        }
        if (currentY > canvas.height) {
            currentY = currentY - canvas.height;
        }
        fire = true;
        return;
    }
    fire = false;
}
