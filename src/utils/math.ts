export const toDeg = (value: number) => value * (Math.PI / 180);

export const normalizeAngle = (angle: number) => {
  const normalizedAngle = angle % (2 * Math.PI);

  if (normalizedAngle <= 0) {
    return 2 * Math.PI + normalizedAngle;
  }

  return normalizedAngle;
};

export const distanceBetween = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};
