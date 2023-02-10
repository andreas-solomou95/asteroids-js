export const FPS = 60;
const SHIP_DIMENSIONS = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    r: 10,
    a: 90
}

export const SHIP_SPEC = {
    ...SHIP_DIMENSIONS,
    // dv: Math.round(20 / SHIP_DIMENSIONS.r),
    // angV: Math.round(16 / SHIP_DIMENSIONS.r)
    dv: 2,
    angV: 5
}