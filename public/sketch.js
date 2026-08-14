let dino;
let obstacles = [];
let particles = [];
let bgLayers = [];
let score = 0;
let highScore = 0;
let gameSpeed = 6;
let spawnTimer = 0;
let nextSpawn = 80;
let gameState = "START"; // Added missing global state declaration

function setup() {
  createCanvas(800, 450);
  noSmooth(); // Essential for crisp pixel art rendering

  dino = new Dino();

  // Initialize parallax background layers
  bgLayers = [
    { speed: 0.2, color: [30, 20, 50], yOffset: 0, height: 450 }, // Sky/Stars handled separately
    { speed: 0.5, color: [60, 30, 80], yOffset: 150, height: 200 }, // Distant mountains
    { speed: 1.2, color: [90, 45, 110], yOffset: 250, height: 150 }, // Closer hills
  ];
}

function draw() {
  background(20);
  // Main state router
  drawBackground();

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAY") {
    if (keyIsDown(DOWN_ARROW)) {
      dino.duck(true);
    }
    playGame();
  } else if (gameState === "GAMEOVER") {
    drawGameOverScreen();
  }
}

function drawBackground() {
  // Retro gradient sky
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 10, 30), color(90, 40, 70), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Retro Sun
  noStroke();
  fill(255, 120, 50, 180);
  ellipse(width - 150, 140, 120, 120);
  fill(15, 10, 30);
  // Cut lines across the sun for synthwave aesthetic
  for (let sy = 120; sy < 180; sy += 8) {
    rect(width - 220, sy, 150, 3);
  }

  // Parallax Hills/Mountains
  for (let layer of bgLayers) {
    fill(layer.color);
    noStroke();
    // Simple repeating wave terrain for retro feel
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width + 20; x += 20) {
      let px = x;
      let py = layer.yOffset + sin((x + frameCount * layer.speed) * 0.01) * 30;
      vertex(px, py);
    }
    vertex(width, height);
    endShape(CLOSE);
  }

  // Ground plane
  fill(20, 10, 30);
  noStroke();
  rect(0, 350, width, 100);

  // Ground neon grid line
  stroke(255, 0, 128);
  strokeWeight(3);
  line(0, 350, width, 350);

  // Moving ground ticks for speed sensation
  stroke(255, 0, 128, 100);
  strokeWeight(2);
  let groundOffset = (frameCount * gameSpeed) % 40;
  for (let x = -groundOffset; x < width; x += 40) {
    line(x, 350, x - 20, 370);
  }
}

function playGame() {
  // Increase difficulty over time
  gameSpeed = 6 + floor(score / 500) * 0.5;

  // Score increment
  score += 1;

  // Obstacle spawning logic
  spawnTimer++;
  if (spawnTimer >= nextSpawn) {
    let type = random() > 0.6 ? "flying" : "ground";
    obstacles.push(new Obstacle(type));
    spawnTimer = 0;
    nextSpawn = floor(random(50, 110) - min(score / 100, 30));
  }

  // Update & Show Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
  }

  // Update & Show Dino
  dino.update();
  dino.display();

  // Update & Show Obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    // Collision detection
    if (dino.hits(obstacles[i])) {
      gameState = "GAMEOVER";
      if (score > highScore) highScore = score;
    }

    // Remove offscreen obstacles
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // HUD / UI on screen
  drawHUD();
}

function drawHUD() {
  fill(255);
  noStroke();
  textSize(16);
  textFont("monospace");
  textAlign(LEFT, TOP);
  text(`SCORE: ${score}`, 30, 20);
  text(`HI: ${highScore}`, 30, 45);

  // Key Instructions Overlay
  fill(255, 255, 255, 180);
  rect(width - 240, 15, 215, 55, 5);
  fill(20, 10, 30);
  textSize(12);
  text("CONTROLS:", width - 230, 22);
  text("UP / SPACE : Jump", width - 230, 38);
  text("DOWN : Duck", width - 230, 54);
}

function drawStartScreen() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(255, 0, 128);
  textSize(36);
  textFont("monospace");
  text("CYBER DINO RUN", width / 2, height / 2 - 40);

  fill(255);
  textSize(16);
  text("PRESS [SPACE] OR [UP ARROW] TO START", width / 2, height / 2 + 20);

  textSize(12);
  fill(255, 200, 0);
  text(
    "Avoid ground cacti & duck under flying drones!",
    width / 2,
    height / 2 + 60,
  );
}

function drawGameOverScreen() {
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(255, 50, 50);
  textSize(36);
  textFont("monospace");
  text("SYSTEM CRASH", width / 2, height / 2 - 50);

  fill(255);
  textSize(18);
  text(`FINAL SCORE: ${score}`, width / 2, height / 2);

  textSize(14);
  fill(0, 255, 128);
  text("PRESS [SPACE] TO REBOOT", width / 2, height / 2 + 50);
}

class Dino {
  constructor() {
    this.w = 40;
    this.h = 44;
    this.x = 80;
    this.y = 350 - this.h;
    this.vy = 0;
    this.gravity = 0.8;
    this.jumpForce = -13;
    this.isDucking = false;
  }

  update() {
    this.y += this.vy;
    this.vy += this.gravity;

    // Ground collision
    let floorLevel = 350 - (this.isDucking ? 24 : this.h);
    if (this.y > floorLevel) {
      this.y = floorLevel;
      this.vy = 0;
    }
  }

  jump() {
    if (this.y >= 350 - (this.isDucking ? 24 : this.h)) {
      this.vy = this.jumpForce;
      this.isDucking = false;
      // Spawn jump dust particles
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(this.x + 20, 350));
      }
    }
  }

  duck(isDown) {
    if (isDown) {
      this.isDucking = true;
      if (this.y < 350 - 24) {
        this.vy += 2; // Fast fall when ducking in air
      }
    } else {
      this.isDucking = false;
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    // Procedural Pixel Art Dinosaur Drawing Grid (Scale = 4px)
    noStroke();
    fill(0, 255, 200); // Cyan cyber-dino theme

    if (this.isDucking) {
      // Ducking sprite shape
      rect(0, 12, 40, 20); // Body
      rect(30, 4, 16, 16); // Head
      rect(8, 28, 6, 8); // Leg 1
      rect(24, 28, 6, 8); // Leg 2
    } else {
      // Running / Standing sprite shape
      let animFrame = floor(frameCount / 6) % 2;

      // Body
      rect(8, 12, 24, 20);
      // Head & Eye
      rect(20, 0, 16, 16);
      fill(20, 10, 30);
      rect(28, 4, 4, 4); // Eye
      fill(0, 255, 200);

      // Tail
      rect(0, 16, 8, 8);
      rect(-4, 20, 4, 8);

      // Animated Legs
      if (animFrame === 0) {
        rect(10, 32, 6, 12);
        rect(22, 32, 6, 8);
      } else {
        rect(10, 32, 6, 8);
        rect(22, 32, 6, 12);
      }
    }
    pop();
  }

  hits(obs) {
    let hitPadding = 6;
    let currentH = this.isDucking ? 24 : this.h;

    return (
      this.x + hitPadding < obs.x + obs.w - hitPadding &&
      this.x + this.w - hitPadding > obs.x + hitPadding &&
      this.y + hitPadding < obs.y + obs.h - hitPadding &&
      this.y + currentH - hitPadding > obs.y + hitPadding
    );
  }
}

class Obstacle {
  constructor(type) {
    this.type = type;
    if (this.type === "ground") {
      this.w = 24;
      this.h = random(35, 55);
      this.x = width;
      this.y = 350 - this.h;
    } else {
      // Flying obstacle (Drone)
      this.w = 32;
      this.h = 20;
      this.x = width;
      this.y = 350 - 65;
    }
  }

  update() {
    this.x -= gameSpeed;
  }

  display() {
    noStroke();
    if (this.type === "ground") {
      // Retro Neon Cactus
      fill(255, 0, 128);
      rect(this.x, this.y, this.w, this.h);
      rect(this.x - 6, this.y + 10, 8, 12);
      rect(this.x + this.w - 2, this.y + 20, 8, 12);
    } else {
      // Cyber Drone (Flying)
      fill(255, 200, 0);
      let hover = sin(frameCount * 0.2) * 4;
      rect(this.x, this.y + hover, this.w, this.h);
      fill(0, 255, 255);
      rect(this.x + 4, this.y + hover - 4, 24, 4);
    }
  }

  offscreen() {
    return this.x < -50;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 0);
    this.vy = random(-2, 0);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 15;
  }

  display() {
    noStroke();
    fill(255, 0, 128, this.alpha);
    rect(this.x, this.y, 4, 4);
  }
}

function keyPressed() {
  if (keyCode === 32 || keyCode === UP_ARROW) {
    if (gameState === "START" || gameState === "GAMEOVER") {
      resetGame();
      gameState = "PLAY";
    } else if (gameState === "PLAY") {
      dino.jump();
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    dino.duck(false);
  }
}

function resetGame() {
  score = 0;
  gameSpeed = 6;
  obstacles = [];
  particles = [];
  spawnTimer = 0;
  nextSpawn = 80;
  dino = new Dino();
}
