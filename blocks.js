import { block } from './assets.js';
import { getRandomArbitrary, toRads } from './utils.js';
import { BLOCK_SPEC } from './variables.js';

let timeStamp = 2_000;

let spawnDirection = 0;
let spawOffset = 0;

export function drawBlocks(ctx, blocksCollection, canvasWidth, canvasHeight) {
    const { width, height, dv } = BLOCK_SPEC;
    blocksCollection = spawner(blocksCollection, canvasWidth, canvasHeight);
    blocksCollection.forEach(([x, y, angle], index) => {
        x += dv * Math.cos(toRads(angle));
        if (x < 0 - BLOCK_SPEC.width) {
            x = canvasWidth + x + BLOCK_SPEC.width;
        }
        if (x > canvasWidth) {
            x = x - canvasWidth - BLOCK_SPEC.width;
        }
        y -= dv * Math.sin(toRads(angle));
        if (y < 0 - BLOCK_SPEC.height) {
            y = y + canvasHeight + BLOCK_SPEC.height;
        }
        if (y > canvasHeight) {
            y = y - canvasHeight - BLOCK_SPEC.height;
        }
        block(ctx, x, y);

        blocksCollection[index] = [x, y, angle];
    });
    return blocksCollection;
}

function spawner(blocksCollection, canvasWidth, canvasHeight) {
    if (new Date().getTime() - timeStamp < 2000) {
        return blocksCollection;
    }
    timeStamp = new Date().getTime();
    let x, y, a = 0;
    switch(spawnDirection) {
        case 0:
            x = 0 - BLOCK_SPEC.width;
            y = 0 - BLOCK_SPEC.height + spawOffset;
            a = 335 + (spawOffset % 360);
            break;
        case 1:
            x = canvasWidth;
            y = 0 + spawOffset;
            a = 205 + (spawOffset % 360);
            break;
        case 2:
            x = canvasWidth + spawOffset;
            y = canvasHeight
            a = 155 + (spawOffset % 360);
            break;
        case 3:
            x = 0 - BLOCK_SPEC.width + spawOffset;
            y = canvasHeight;
            a = 25 + (spawOffset % 360);
            break;
    }
    spawnDirection = (spawnDirection + 1) % 4;
    if (spawnDirection === 0) {
        spawOffset = getRandomArbitrary(0, Math.min(canvasWidth, canvasHeight));
    }
    return [...blocksCollection, [x, y, a]]
}