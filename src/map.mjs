import { TILE_SIZE } from "./settings.mjs";

export class Map {
  constructor() {
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    this.MAP_COLOR = {
      1: "#333",
      0: "#fff",
    };
  }

  hasWallAt(x, y) {
    return this.grid[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
  }

  render(context) {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        const tileX = col * TILE_SIZE;
        const tileY = row * TILE_SIZE;

        const color = this.MAP_COLOR[this.grid[row][col]];

        context.fillStyle = color;
        context.fillRect(tileX, tileY, TILE_SIZE - 1, TILE_SIZE - 1);
      }
    }
  }
}
