# Cyber Dino Run

A synthwave-inspired endless runner featuring procedural pixel art, dynamic difficulty scaling, and a multi-layered parallax background.

## Features

* **Procedural Pixel Art** — No external game assets required. The dino, obstacles, drones, and environment are rendered using primitive shapes.
* **Dynamic Difficulty** — Game speed and obstacle frequency increase as the score rises, creating progressively more challenging gameplay.
* **Synthwave Aesthetic** — Retro-gradient sky, glowing neon grid lines, and a scrolling mountain range create a cyberpunk-inspired visual style.
* **Dual Obstacle System** — Players must react differently to ground-based cacti and aerial drones, using jump and duck mechanics respectively.
* **Lightweight & Self-Contained** — Runs directly in the browser with minimal dependencies.

## Controls

| Action  | Key                  |
| ------- | -------------------- |
| Jump    | `UP ARROW` / `SPACE` |
| Duck    | `DOWN ARROW`         |
| Restart | `SPACE`              |

## Local Deployment

### 1. Clone or download the project

Place the project files in a local directory.

### 2. Create the HTML entry point

Create an `index.html` file with the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyber Dino Run</title>

    <style>
        body {
            margin: 0;
            background: #111;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    </style>

    <!-- Graphics rendering engine -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
</head>
<body>
    <script src="sketch.js"></script>
</body>
</html>
```

### 3. Add the game script

Place the game implementation in a `sketch.js` file in the same directory as `index.html`.

### 4. Run locally

Open `index.html` in a modern web browser.

For the most reliable local development experience, serve the project through a local HTTP server rather than opening the file directly.

## Project Structure

```text
cyber-dino-run/
├── index.html
├── sketch.js
└── README.md
```

## Acknowledgements

This project was developed with guidance from the [Google Codelabs Gemini Games Firebase Guide](https://codelabs.developers.google.com/codelabs/gemini-games-firebase#4), with the gameplay, visual direction, procedural artwork, and presentation adapted for this implementation.

## Development Note

This project was created using an **AI-assisted development workflow**, with iterative direction, testing, and customization used to shape the final gameplay and visual experience.
