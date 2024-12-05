# Raycasting Simulation

Raycasting Simulation is a lightweight and interactive project that demonstrates the fundamentals of raycasting using HTML5 Canvas and TypeScript. The project includes an interactive player navigating a 2D map with real-time rendering of rays cast from the player's point of view.

[Preview](https://hitaloose.github.io/raycasting/)

---

## Features

- **2D Map Rendering**: Visualize a grid-based map with customizable wall and floor tiles.
- **Player Movement**: Use keyboard controls to move the player around the map.
- **Raycasting Mechanics**: Render rays from the player's perspective to simulate visibility.
- **Dynamic View**: Real-time updates to the player's field of vision and map rendering.

---

## Project Structure

The project consists of 13 files structured as follows:

### **Root Directory**

- **`index.html`**: Main HTML entry point.
- **`package.json`**: Project metadata and scripts.
- **`tsconfig.json`**: TypeScript configuration.

### **Source Files (`src`)**

#### **Main Entry**

- **`main.ts`**: Initializes the canvas, player, and map; manages the game loop.

#### **Entities**

- **`entities/map.ts`**: Manages the grid-based map and renders it to the canvas.
- **`entities/player.ts`**: Defines the player entity, including movement and rendering.
- **`entities/ray.ts`**: Represents individual rays cast from the player's perspective.
- **`entities/raycaster.ts`**: Handles raycasting logic and rendering of rays.

#### **Utilities**

- **`utils/constants.ts`**: Centralized constants (e.g., tile size, window dimensions, FOV).
- **`utils/loop.ts`**: Simplified game loop implementation.
- **`utils/math.ts`**: Mathematical utility functions for angles, normalization, and distance calculations.

### **Styles**

- **`styles/reset.css`**: CSS reset for consistent styling across browsers.
- **`styles/style.css`**: Custom styles for the canvas and layout.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/raycasting-simulation.git
   cd raycasting-simulation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Access the project at `http://localhost:3000` (or the provided URL).

### Build for Production

Generate a production-ready build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

---

## Controls

- **Arrow Keys**:
  - `ArrowUp`: Move forward
  - `ArrowDown`: Move backward
  - `ArrowLeft`: Rotate left
  - `ArrowRight`: Rotate right

---

## File Highlights

### `index.html`

Defines the layout for two canvas elements:

- **`#pov`**: Player's field of view.
- **`#map`**: Overhead map of the environment.

### `src/entities/player.ts`

Handles player position, movement, and collision detection.

### `src/entities/raycaster.ts`

Casts multiple rays in the player's field of vision and calculates wall intersections.

---

## Technologies Used

- **TypeScript**: Ensures type safety and cleaner code.
- **Vite**: Lightweight and fast build tool for development.
- **HTML5 Canvas**: Provides a rendering surface for 2D graphics.
- **CSS**: Styling for the layout and canvas elements.

---

## Future Enhancements

- Add textures for walls and floors.
- Implement dynamic lighting and shadows.
- Optimize raycasting performance.
- Expand map customization options.

---

## Contributing

Contributions are welcome! Feel free to fork this repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Inspired by raycasting techniques used in early 3D games like Wolfenstein 3D.
- CSS Reset by [Eric Meyer](http://meyerweb.com/eric/tools/css/reset/).

---

**Enjoy experimenting with raycasting!**
