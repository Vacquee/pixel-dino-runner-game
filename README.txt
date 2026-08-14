# Cyber Dino Run

A captivating, endless runner game featuring a synthwave-inspired cyberpunk aesthetic, procedural pixel-art generation, dynamic difficulty scaling, and a multi-layered parallax background.

## Features
- **Procedural Pixel Art**: No external assets required. Everything (the dino, obstacles, drones) is rendered using primitive shapes, making the project lightweight and self-contained.
- **Dynamic Difficulty**: The game speed and obstacle frequency increase as your score climbs, creating rising tension.
- **Synthwave Aesthetic**: Features a retro-gradient sky, glowing neon grid lines, and a parallax scrolling mountain range.
- **Dual Obstacle System**: Players must differentiate between ground-based cacti and aerial drones, requiring different inputs (jump vs. duck).

## Controls
- **Jump**: `UP ARROW` or `SPACE`
- **Duck**: `DOWN ARROW`
- **Restart**: `SPACE` (on Game Over screen)

## Local Deployment Instructions
To run and deploy this game locally on your machine, set up a standard local web structure:

1. Create a project folder and add an `index.html` file:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
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
       <!-- Graphics rendering engine script -->
       <script src="[https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js)"></script>
   </head>
   <body>
       <script src="sketch.js"></script>
   </body>
   </html>