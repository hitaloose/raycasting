export const framedLoop = (frame, callback) => {
  setInterval(callback, 1000 / frame);
};

export const toDeg = (value) => value * (Math.PI / 180);

export const KEYS = {
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
};

export const normalizeAngle = (angle) => {
  const normalizedAngle = angle % (2 * Math.PI);

  if (normalizedAngle <= 0) {
    return 2 * Math.PI + normalizedAngle;
  }

  return normalizedAngle;
};

export const distanceBetween = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};
