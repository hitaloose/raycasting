import { TILE_SIZE, WINDOW_HEIGHT, WINDOW_WIDTH } from "./settings.mjs";
import { distanceBetween, normalizeAngle } from "./utils.mjs";

export class Ray {
  constructor(angle, player, map) {
    this.angle = normalizeAngle(angle);
    this.player = player;
    this.map = map;

    this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
    this.isFacingUp = !this.isFacingDown;
    this.isFacingRight =
      this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
    this.isFacingLeft = !this.isFacingRight;

    this.wallHitX = 0;
    this.wallHitY = 0;

    this.distance = 0;
    this.color = 255;
  }

  cast() {
    let firstIntersectionX = null;
    let firstIntersectionY = null;

    // HORIZONTAL CHECKING
    let foundHorizontalWall = false;
    let horizontalHitX = 0;
    let horizontalHitY = 0;

    if (this.isFacingUp) {
      firstIntersectionY =
        Math.floor(this.player.y / TILE_SIZE) * TILE_SIZE - 0.0001;
    }
    if (this.isFacingDown) {
      firstIntersectionY =
        Math.floor(this.player.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
    }

    firstIntersectionX =
      this.player.x +
      (firstIntersectionY - this.player.y) / Math.tan(this.angle);

    let nextHorizontalX = firstIntersectionX;
    let nextHorizontalY = firstIntersectionY;

    let xa = 0;
    let ya = 0;

    if (this.isFacingUp) {
      ya = -TILE_SIZE;
    }
    if (this.isFacingDown) {
      ya = TILE_SIZE;
    }

    xa = ya / Math.tan(this.angle);

    while (
      nextHorizontalX <= WINDOW_WIDTH &&
      nextHorizontalX >= 0 &&
      nextHorizontalY <= WINDOW_HEIGHT &&
      nextHorizontalY >= 0
    ) {
      if (this.map.hasWallAt(nextHorizontalX, nextHorizontalY)) {
        foundHorizontalWall = true;
        horizontalHitX = nextHorizontalX;
        horizontalHitY = nextHorizontalY;
        break;
      } else {
        nextHorizontalX += xa;
        nextHorizontalY += ya;
      }
    }

    // VERTICAL CHECKING
    let foundVerticalWall = false;
    let verticalHitX = 0;
    let verticalHitY = 0;

    if (this.isFacingRight) {
      firstIntersectionX =
        Math.floor(this.player.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
    }
    if (this.isFacingLeft) {
      firstIntersectionX =
        Math.floor(this.player.x / TILE_SIZE) * TILE_SIZE - 0.0001;
    }

    firstIntersectionY =
      this.player.y +
      (firstIntersectionX - this.player.x) * Math.tan(this.angle);

    let nextVerticalX = firstIntersectionX;
    let nextVerticalY = firstIntersectionY;

    if (this.isFacingRight) {
      xa = TILE_SIZE;
    }
    if (this.isFacingLeft) {
      xa = -TILE_SIZE;
    }

    ya = xa * Math.tan(this.angle);

    while (
      nextVerticalX <= WINDOW_WIDTH &&
      nextVerticalX >= 0 &&
      nextVerticalY <= WINDOW_HEIGHT &&
      nextVerticalY >= 0
    ) {
      if (this.map.hasWallAt(nextVerticalX, nextVerticalY)) {
        foundVerticalWall = true;
        verticalHitX = nextVerticalX;
        verticalHitY = nextVerticalY;
        break;
      } else {
        nextVerticalX += xa;
        nextVerticalY += ya;
      }
    }

    // DISTANCE CALCULATION
    let horizontalDistance = 0;
    let verticalDistance = 0;

    if (foundHorizontalWall) {
      horizontalDistance = distanceBetween(
        this.player.x,
        this.player.y,
        horizontalHitX,
        horizontalHitY
      );
    } else {
      horizontalDistance = 9999;
    }

    if (foundVerticalWall) {
      verticalDistance = distanceBetween(
        this.player.x,
        this.player.y,
        verticalHitX,
        verticalHitY
      );
    } else {
      verticalDistance = 9999;
    }

    if (horizontalDistance < verticalDistance) {
      this.wallHitX = horizontalHitX;
      this.wallHitY = horizontalHitY;
      this.distance = horizontalDistance;
      this.color = 160;
    } else {
      this.wallHitX = verticalHitX;
      this.wallHitY = verticalHitY;
      this.distance = verticalDistance;
      this.color = 250;
    }

    this.distance =
      this.distance * Math.cos(this.player.rotationAngle - this.angle);

    this.color = this.color * (60 / this.distance);

    if (this.color > 255) {
      this.color = 255;
    }
    if (this.color < 0) {
      this.color = 0;
    }
  }

  render(context) {
    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(this.player.x, this.player.y);
    context.lineTo(this.wallHitX, this.wallHitY);
    context.stroke();
  }
}
