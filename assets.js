import { SHIP_SPEC, POLYGON_SPEC } from './variables.js';
import { toRads } from './utils.js';
import { currentX, currentY, currentAngle} from './index.js';

export function space(canvas, ctx, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
}

export function ship(ctx, renderedFrame) {
    const x = currentX;
    const y = currentY;
    const radius = SHIP_SPEC.r;
    const angle = toRads(currentAngle);
    const keyframe = renderedFrame % 2;
    // const keyframe = 1;

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
    ctx.shadowColor = !!keyframe ? 'limegreen' : '#3af21b';
    ctx.strokeStyle = !!keyframe ? 'limegreen' : '#3af21b';
    ctx.lineWidth = 2;
    ctx.stroke();
}

export function thruster(ctx, renderedFrame, fire) {
    const radius = SHIP_SPEC.r;
    const angle = toRads(currentAngle);

    const keyframe = Math.round((renderedFrame % 6 + 1) / 2);
    // const keyframe = 1;

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

export function polygon(ctx, x, y) {
    ctx.strokeStyle = 'limegreen';
    ctx.rect(x, y, POLYGON_SPEC.width, POLYGON_SPEC.height);
    ctx.stroke();
}
