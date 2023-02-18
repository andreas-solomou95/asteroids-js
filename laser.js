import { LASER_SPEC, SHIP_SPEC } from './variables.js';
import { toRads } from './utils.js';

const skipCondition = (a, b) => (a < 0) || (a > b);    

export function drawLasers(renderedFrame, ctx, laserCollection, canvasWidth, canvasHeight) {
    const { width, height, dv } = LASER_SPEC;
    const keyframe = renderedFrame % 4;
    
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = !!keyframe ? 'limegreen' : '#f70';
    ctx.fillStyle = keyframe ? 'limegreen' : '#f70';
    laserCollection.forEach(([x, y, angle], index) => {
        x += dv * Math.cos(toRads(angle));
        y -= dv * Math.sin(toRads(angle));

        if (skipCondition(x, canvasWidth) || skipCondition(y, canvasHeight)) {
            laserCollection.splice(index, 1);
            return;
        }
        ctx.fillRect(x, y, width, height)
        laserCollection[index] = [x, y, angle];
    });

    return laserCollection;
}

export function fireLaser(x, y, a, laserCollection) {
    const radius = SHIP_SPEC.r;
    const angle = toRads(a);

    const laserX = x - (LASER_SPEC.width / 2) + 2 * radius * (Math.cos(angle));
    const laserY = y - (LASER_SPEC.height / 2) - 2 * radius * (Math.sin(angle));

    return [...laserCollection, [laserX, laserY, a]];
}