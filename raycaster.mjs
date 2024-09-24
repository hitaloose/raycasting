import { Ray } from "./ray.mjs";
import { FOV, NUM_RAYS, RES, WINDOW_HEIGHT } from "./settings.mjs";

export class Raycaster {
  constructor(player, map) {
    this.player = player;
    this.map = map;
    this.rays = [];
  }

  castAllRays() {
    this.rays = [];

    let rayAngle = this.player.rotationAngle - FOV / 2;

    for (let index = 0; index < NUM_RAYS; index++) {
      const ray = new Ray(rayAngle, this.player, this.map);
      ray.cast();
      this.rays.push(ray);

      rayAngle += FOV / NUM_RAYS;
    }
  }

  render(context) {
    const WALL_HEIGHT = 32;

    let counter = 1;

    for (const ray of this.rays) {
        // ray.render(context);

      const lineHeight = (WALL_HEIGHT / ray.distance) * 415;

      const drawBegin = WINDOW_HEIGHT / 2 - lineHeight / 2;
      const drawEnd = lineHeight;

      context.fillStyle = `rgb(${ray.color}, ${ray.color}, ${ray.color})`;
      context.fillRect(counter * RES, drawBegin, RES, drawEnd);

      counter++;
    }
  }
}
