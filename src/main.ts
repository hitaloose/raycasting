import { Map } from "./entities/map";
import { Player } from "./entities/player";
import { Raycaster } from "./entities/raycaster";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./utils/constants";
import { framedLoop } from "./utils/loop";

const povCanvas = document.querySelector("canvas#pov") as HTMLCanvasElement;
const mapCanvas = document.querySelector("canvas#map") as HTMLCanvasElement;

const povContext = povCanvas!.getContext("2d")!;
const mapContext = mapCanvas!.getContext("2d")!;

povContext.canvas.width = WINDOW_WIDTH;
povContext.canvas.height = WINDOW_HEIGHT;
mapContext.canvas.width = WINDOW_WIDTH;
mapContext.canvas.height = WINDOW_HEIGHT;

const map = new Map();
const player = new Player(map);
const raycaster = new Raycaster(player, map);

framedLoop(60, () => {
  povContext.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  player.update();
  raycaster.castAllRays();

  map.render(mapContext);
  player.render(mapContext);

  raycaster.render(povContext, mapContext);
});
