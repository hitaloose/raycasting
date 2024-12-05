import { toDeg } from "./math";

export const KEYS = {
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
};

export const TILE_SIZE = 32;

export const ROWS = 10;
export const COLS = 15;

export const WINDOW_WIDTH = COLS * TILE_SIZE;
export const WINDOW_HEIGHT = ROWS * TILE_SIZE;

export const FOV = toDeg(60);

export const RES = 1;

export const NUM_RAYS = Math.floor(WINDOW_WIDTH / RES);
