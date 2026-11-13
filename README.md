# Raycasting

A from-scratch raycaster in TypeScript and HTML5 Canvas, in the style of early 3D games: the top canvas shows the player's first-person view, the one below it the top-down map with every ray drawn.

**[Try it in the browser →](https://hitaloose.github.io/raycasting/)** — move with the arrow keys.

## How it works

Each frame, `Raycaster` casts one ray per screen column (480 rays across a 60° field of view). Each `Ray` walks the grid with the DDA approach:

1. Find the first horizontal and the first vertical grid line the ray crosses.
2. Step one tile at a time along each axis until a wall tile is hit.
3. Keep the closer of the two hits and multiply its distance by the cosine of the angle to the view direction, which removes the fish-eye distortion.

The wall slice for that column is drawn with a height inversely proportional to the distance, and horizontal and vertical hits get different shades so corners stay readable.

| File | Role |
|---|---|
| `src/main.ts` | Sets up both canvases and runs the game loop |
| `src/entities/player.ts` | Position, rotation, keyboard input and wall collision |
| `src/entities/map.ts` | 15×10 tile grid, `hasWallAt(x, y)` |
| `src/entities/ray.ts` | Grid intersections for one ray |
| `src/entities/raycaster.ts` | Casts all rays and projects the wall slices |
| `src/utils/` | Constants (tile size, FOV), loop, angle and distance math |

## Controls

| Key | Action |
|---|---|
| `↑` / `↓` | Move forward / backward |
| `←` / `→` | Turn left / right |

## Running locally

```bash
git clone https://github.com/hitaloose/raycasting.git
cd raycasting
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`. Every push to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Next steps

- Textured walls
- Distance-based shading
- Loading maps from a file
