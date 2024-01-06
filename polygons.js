import { polygon } from './assets.js';
import { getRandomArbitrary, toRads } from './utils.js';
import { POLYGON_SPEC } from './variables.js';

let timeStamp = 2_000;

let spawnDirection = 0;
let spawOffset = 0;

export function drawPolygons(ctx, polygonsCollection, canvasWidth, canvasHeight) {
    const { radius, dv } = POLYGON_SPEC;
    polygonsCollection = spawner(polygonsCollection, canvasWidth, canvasHeight);
    polygonsCollection.forEach(([x, y, angle], index) => {
        x += dv * Math.cos(toRads(angle));
        if (x < 0 - radius) {
            x = canvasWidth + x + radius;
        }
        if (x > canvasWidth) {
            x = x - canvasWidth - radius;
        }
        y -= dv * Math.sin(toRads(angle));
        if (y < 0 - radius) {
            y = y + canvasHeight + radius;
        }
        if (y > canvasHeight) {
            y = y - canvasHeight - radius;
        }
        polygon(ctx, x, y);

        polygonsCollection[index] = [x, y, angle];
    });
    return polygonsCollection;
}

function spawner(polygonsCollection, canvasWidth, canvasHeight) {
    if (new Date().getTime() - timeStamp < 2000) {
        return polygonsCollection;
    }
    timeStamp = new Date().getTime();
    let x, y, a = 0;
    switch(spawnDirection) {
        case 0:
            x = 0 - POLYGON_SPEC.radius;
            y = 0 - POLYGON_SPEC.radius + spawOffset;
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
            x = 0 - POLYGON_SPEC.radius + spawOffset;
            y = canvasHeight;
            a = 25 + (spawOffset % 360);
            break;
    }
    spawnDirection = (spawnDirection + 1) % 4;
    if (spawnDirection === 0) {
        spawOffset = getRandomArbitrary(0, Math.min(canvasWidth, canvasHeight));
    }
    return [...polygonsCollection, [x, y, a]]
}
