export const FPS = 60;
const SHIP_DIMENSIONS = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    r: 10,
    a: 90
}

export const SHIP_SPEC = {
    ...SHIP_DIMENSIONS,
    dv: 3,
    angV: 5
}

export const LASER_SPEC = {
    dv: 5,
    width: 2,
    height: 2,
    rate: 6 // per second
}

export const POLYGON_SPEC = {
    width: 100,
    height: 100,
    dv: 3
}
