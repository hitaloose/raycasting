import { TILE_SIZE } from "../utils/constants";

export class Map {
  readonly GRID = [
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

  readonly MAP_COLOR: Record<number, string> = {
    1: "#333",
    0: "#fff",
  };

  hasWallAt(x: number, y: number) {
    return this.GRID[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
  }

  render(context: CanvasRenderingContext2D) {
    for (let row = 0; row < this.GRID.length; row++) {
      for (let col = 0; col < this.GRID[0].length; col++) {
        const tileX = col * TILE_SIZE;
        const tileY = row * TILE_SIZE;

        const color = this.MAP_COLOR[this.GRID[row][col]];

        context.fillStyle = color;
        context.fillRect(tileX, tileY, TILE_SIZE - 1, TILE_SIZE - 1);
      }
    }
  }
}
