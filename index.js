import { space, ship, thruster } from './assets.js';
import { FPS, SHIP_SPEC } from './variables.js';
import { keyIsActive, toRads } from './utils.js';

let renderedFrame = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const counter = document.getElementById('frameCounter');

export let currentX = SHIP_SPEC.x;
export let currentY = SHIP_SPEC.y;
export let currentAngle = SHIP_SPEC.a;

const keydown = (event) => keys[event.keyCode] = true;
const keyup = (event) => keys[event.keyCode] = false;

setInterval(update, 1000 / FPS)
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

const keys = new Array();
let fire = true;

function update() {
    handlePosition();
    space(canvas, ctx);
    ship(ctx, renderedFrame);
    thruster(ctx, renderedFrame, fire);

    counter.innerHTML = `
    ${renderedFrame % FPS + '/' + FPS} <br>
    ${currentAngle} <br>
    ${fire}`;
    renderedFrame++;
}

function handlePosition() {
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