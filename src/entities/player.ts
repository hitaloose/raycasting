import { KEYS, WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import { toDeg } from "../utils/math";
import { Map } from "./map";

export class Player {
  readonly MOVE_SPEED = 3;
  readonly ROTATION_SPEED = toDeg(3.5);
  readonly RADIUS = 3;

  map: Map;
  x: number;
  y: number;
  turnDirection: number;
  walkDirection: number;
  rotationAngle: number;

  eventsKeyAssign: string[];
  keysPressed: Record<string, boolean>;

  constructor(map: Map) {
    this.map = map;
    this.x = WINDOW_WIDTH / 2;
    this.y = WINDOW_HEIGHT / 2;
    this.turnDirection = 0;
    this.walkDirection = 0;
    this.rotationAngle = toDeg(0);

    this.keysPressed = {};
    this.eventsKeyAssign = Object.values(KEYS);

    document.addEventListener("keydown", (event) => {
      if (!this.eventsKeyAssign.includes(event.key)) {
        return;
      }

      this.keysPressed[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
      if (!this.eventsKeyAssign.includes(event.key)) {
        return;
      }

      this.keysPressed[event.key] = false;
    });
  }

  getTurnDirection() {
    if (this.keysPressed[KEYS.ARROW_RIGHT]) {
      return 1;
    }

    if (this.keysPressed[KEYS.ARROW_LEFT]) {
      return -1;
    }

    return 0;
  }

  getWalkDirection() {
    if (this.keysPressed[KEYS.ARROW_UP]) {
      return 1;
    }

    if (this.keysPressed[KEYS.ARROW_DOWN]) {
      return -1;
    }

    return 0;
  }

  update() {
    this.turnDirection = this.getTurnDirection();
    this.walkDirection = this.getWalkDirection();

    this.rotationAngle += this.turnDirection * this.ROTATION_SPEED;

    const moveStep = this.walkDirection * this.MOVE_SPEED;

    const x = this.x + Math.cos(this.rotationAngle) * moveStep;
    const y = this.y + Math.sin(this.rotationAngle) * moveStep;

    if (this.map.hasWallAt(x, y)) {
      return;
    }

    this.x = x;
    this.y = y;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.x, this.y, this.RADIUS, 0, 2 * Math.PI);
    context.fill();
  }
}
