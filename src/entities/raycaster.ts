import { FOV, NUM_RAYS, RES, WINDOW_HEIGHT } from "../utils/constants";
import { Map } from "./map";
import { Player } from "./player";
import { Ray } from "./ray";

export class Raycaster {
  private player: Player;
  private map: Map;
  public rays: Ray[] = [];

  constructor(player: any, map: any) {
    this.player = player;
    this.map = map;
  }

  castAllRays(): void {
    this.rays = [];

    let rayAngle = this.player.rotationAngle - FOV / 2;

    for (let index = 0; index < NUM_RAYS; index++) {
      const ray = new Ray(rayAngle, this.player, this.map);
      ray.cast();
      this.rays.push(ray);

      rayAngle += FOV / NUM_RAYS;
    }
  }

  private calculateLineProperties(ray: Ray): { drawBegin: number; drawEnd: number; color: string } {
    const WALL_HEIGHT = 32;
    const lineHeight = (WALL_HEIGHT / ray.distance) * 415;
    const drawBegin = WINDOW_HEIGHT / 2 - lineHeight / 2;
    const drawEnd = lineHeight;
    const color = `rgb(${ray.color}, ${ray.color}, ${ray.color})`;

    return { drawBegin, drawEnd, color };
  }

  render(context: CanvasRenderingContext2D, mapContext?: CanvasRenderingContext2D): void {
    let columnIndex = 1;

    for (const ray of this.rays) {
      if (mapContext) {
        ray.render(mapContext);
      }

      const { drawBegin, drawEnd, color } = this.calculateLineProperties(ray);
      context.fillStyle = color;
      context.fillRect(columnIndex * RES, drawBegin, RES, drawEnd);
      columnIndex++;
    }
  }
}
