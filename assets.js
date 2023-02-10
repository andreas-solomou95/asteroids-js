import { SHIP_SPEC } from './variables.js';
import { toRads } from './utils.js';
import { currentX, currentY, currentAngle } from './index.js';

export function space(canvas, ctx, color = 'black') {
    // ctx.fillStyle = color;
    // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // ctx.save();
}

export function ship(ctx, renderedFrame) {
    const x = currentX;
    const y = currentY;
    const radius = SHIP_SPEC.r;
    const angle = toRads(currentAngle);
    const keyframe = renderedFrame % 2;

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

    ctx.shadowBlur  = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = !!keyframe ? 'limegreen' : '#0f3808';
    ctx.strokeStyle = !!keyframe ? 'limegreen' : '#0f3808';
    ctx.lineWidth = 2;
    ctx.stroke();
}

export function thruster(ctx, renderedFrame, fire) {
    const radius = SHIP_SPEC.r;
    const angle = toRads(currentAngle);

    const keyframe = Math.round((renderedFrame % 6 + 1) / 2);

    const thrust = fire ? 1 : 1.5;

    ctx.beginPath();
    ctx.moveTo(
        currentX - radius * (Math.cos(angle)),
        currentY + radius * (Math.sin(angle))
    );
    ctx.lineTo(
        currentX - keyframe * radius / thrust * (Math.cos(angle)),
        currentY + keyframe * radius / thrust * (Math.sin(angle))
    );

    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = fire ? '#f00' : '#700';
    ctx.strokeStyle = fire ? '#f00' : '#700';
    ctx.lineWidth = 2;

    ctx.stroke();
}

export function laser(ctx, x, y, a) {
    const radius = SHIP_SPEC.r;
    const angle = toRads(a);

    const laserX = x + 2 * radius * (Math.cos(angle));
    const laserY = y - 2 * radius * (Math.sin(angle));

    ctx.fillStyle = "red";
    ctx.fillRect(laserX, laserY, 2, 2);


    
    //     ctx.beginPath();
    //     ctx.moveTo(
    //         x - radius * -1 * (Math.cos(angle)),
    //         y + radius * -1 * (Math.sin(angle))
    //     );
    //     ctx.lineTo(
    //         x - radius * -4 * (Math.cos(angle)),
    //         y + radius * -4 * (Math.sin(angle))
    //     );
    //     ctx.shadowBlur = 5;
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 0;
    //     ctx.shadowColor = '#f00';
    //     ctx.strokeStyle = '#f00';
    //     ctx.lineWidth = 2;
    //     ctx.stroke();
}