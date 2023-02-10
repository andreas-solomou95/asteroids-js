import { space, ship, thruster, laser } from './assets.js';
import { FPS, SHIP_SPEC } from './variables.js';
import { toRads } from './utils.js';

let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('frameCounter');

export let currentX = SHIP_SPEC.x;
export let currentY = SHIP_SPEC.y;
export let currentAngle = SHIP_SPEC.a;

const keydown = (event) => keys[event.keyCode] = event.keyCode;
const keyup = (event) => keys[event.keyCode] = false;

window.requestAnimationFrame(update);

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

const keys = new Array();
let fire = false;

let start = Date.now();

function update() {
    let stop = Date.now();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    handleKeyEvents();
    space(canvas, ctx);
    ship(ctx, renderedFrame);
    thruster(ctx, renderedFrame, fire);
    counter.innerHTML = `
    ${stop - start}ms <br>`;
    start = stop;

    renderedFrame++;

    window.requestAnimationFrame(update);
}

function handleKeyEvents() {
    // laser
    if (keys[32]) {
        laser(ctx, currentX, currentY, currentAngle);
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