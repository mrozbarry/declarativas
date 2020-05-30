export const request = (fn) => window.requestAnimationFrame(fn);
export const cancel = (handle) => window.cancelAnimationFrame(handle);
