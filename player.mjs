import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./settings.mjs";
import { KEYS, toDeg } from "./utils.mjs";

export class Player {
  constructor(map) {
    this.map = map;

    this.x = WINDOW_WIDTH / 2;
    this.y = WINDOW_HEIGHT / 2;
    this.radius = 3;
    this.turnDirection = 0;
    this.walkDirection = 0;
    this.rotationAngle = toDeg(0);
    this.MOVE_SPEED = 3;
    this.ROTATION_SPEED = toDeg(3.5);

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

  _turnDirection() {
    if (this.keysPressed[KEYS.ARROW_RIGHT]) {
      return 1;
    }

    if (this.keysPressed[KEYS.ARROW_LEFT]) {
      return -1;
    }

    return 0;
  }

  _walkDirection() {
    if (this.keysPressed[KEYS.ARROW_UP]) {
      return 1;
    }

    if (this.keysPressed[KEYS.ARROW_DOWN]) {
      return -1;
    }

    return 0;
  }

  update() {
    this.turnDirection = this._turnDirection();
    this.walkDirection = this._walkDirection();

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

  render(context) {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}
