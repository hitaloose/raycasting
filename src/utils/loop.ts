export const framedLoop = (frame: number, callback: () => void) => {
  setInterval(callback, 1000 / frame);
};
