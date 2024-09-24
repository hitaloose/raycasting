import { Map } from "./map.mjs";
import { Player } from "./player.mjs";
import { Raycaster } from "./raycaster.mjs";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./settings.mjs";
import { framedLoop } from "./utils.mjs";

const canvas = document.querySelector("#root");
const context = canvas.getContext("2d");

context.canvas.width = WINDOW_WIDTH;
context.canvas.height = WINDOW_HEIGHT;

const map = new Map();
const player = new Player(map);
const raycaster = new Raycaster(player, map);

framedLoop(60, () => {
  context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  player.update();
  raycaster.castAllRays();

  // map.render(context);
  // player.render(context);
  raycaster.render(context);
});
