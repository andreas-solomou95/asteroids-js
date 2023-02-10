export const toRads = (deg) => deg * (Math.PI / 180);
export const keyIsActive = (code, arr, state = true) => code in arr && arr[code] === state;