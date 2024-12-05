import { TILE_SIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import { distanceBetween, normalizeAngle } from "../utils/math";
import { Map } from "./map";
import { Player } from "./player";

export class Ray {
  private angle: number;
  private player: Player;
  private map: Map;

  private isFacingDown: boolean;
  private isFacingUp: boolean;
  private isFacingRight: boolean;
  private isFacingLeft: boolean;

  public wallHitX: number = 0;
  public wallHitY: number = 0;
  public distance: number = 0;
  public color: number = 255;

  constructor(angle: number, player: Player, map: Map) {
    this.angle = normalizeAngle(angle);
    this.player = player;
    this.map = map;

    this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
    this.isFacingUp = !this.isFacingDown;
    this.isFacingRight = this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
    this.isFacingLeft = !this.isFacingRight;
  }

  private computeFirstIntersection(axis: "horizontal" | "vertical"): { x: number; y: number } {
    if (axis === "horizontal") {
      const y = this.isFacingUp
        ? Math.floor(this.player.y / TILE_SIZE) * TILE_SIZE - 0.0001
        : Math.floor(this.player.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
      const x = this.player.x + (y - this.player.y) / Math.tan(this.angle);
      return { x, y };
    } else {
      const x = this.isFacingLeft
        ? Math.floor(this.player.x / TILE_SIZE) * TILE_SIZE - 0.0001
        : Math.floor(this.player.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
      const y = this.player.y + (x - this.player.x) * Math.tan(this.angle);
      return { x, y };
    }
  }

  private computeStepIncrements(axis: "horizontal" | "vertical"): { xa: number; ya: number } {
    if (axis === "horizontal") {
      const ya = this.isFacingUp ? -TILE_SIZE : TILE_SIZE;
      const xa = ya / Math.tan(this.angle);
      return { xa, ya };
    } else {
      const xa = this.isFacingLeft ? -TILE_SIZE : TILE_SIZE;
      const ya = xa * Math.tan(this.angle);
      return { xa, ya };
    }
  }

  private traceRay(axis: "horizontal" | "vertical"): { hitX: number; hitY: number; foundWall: boolean } {
    const { x: firstX, y: firstY } = this.computeFirstIntersection(axis);
    const { xa, ya } = this.computeStepIncrements(axis);

    let nextX = firstX;
    let nextY = firstY;

    while (nextX >= 0 && nextX <= WINDOW_WIDTH && nextY >= 0 && nextY <= WINDOW_HEIGHT) {
      if (this.map.hasWallAt(nextX, nextY)) {
        return { hitX: nextX, hitY: nextY, foundWall: true };
      }
      nextX += xa;
      nextY += ya;
    }

    return { hitX: 0, hitY: 0, foundWall: false };
  }

  cast(): void {
    const horizontal = this.traceRay("horizontal");
    const vertical = this.traceRay("vertical");

    const horizontalDistance = horizontal.foundWall
      ? distanceBetween(this.player.x, this.player.y, horizontal.hitX, horizontal.hitY)
      : Infinity;

    const verticalDistance = vertical.foundWall
      ? distanceBetween(this.player.x, this.player.y, vertical.hitX, vertical.hitY)
      : Infinity;

    if (horizontalDistance < verticalDistance) {
      this.wallHitX = horizontal.hitX;
      this.wallHitY = horizontal.hitY;
      this.distance = horizontalDistance;
      this.color = 160;
    } else {
      this.wallHitX = vertical.hitX;
      this.wallHitY = vertical.hitY;
      this.distance = verticalDistance;
      this.color = 250;
    }

    this.distance *= Math.cos(this.player.rotationAngle - this.angle);
    this.color = Math.min(Math.max(this.color * (60 / this.distance), 0), 255);
  }

  render(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(this.player.x, this.player.y);
    context.lineTo(this.wallHitX, this.wallHitY);
    context.stroke();
  }
}
