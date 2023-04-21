// Define the canvas element
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Define the moving object

let marioLeftImg = new Image();
marioLeftImg.src = "mario-left.png";

let marioRightImg = new Image();
marioRightImg.src = "mario-right.png";

let marioImg = marioLeftImg;

let marioX = canvas.width / 2;
let marioY = canvas.height - 120;
let marioSpeed = 20;

// Define the falling object
let turtleImg = new Image();
turtleImg.src = "turtle.png";
let turtleX = Math.random() * (canvas.width - 50);
let turtleY = -50;
let turtleSpeed = 5;

// Add variables for sprite animation
let frameIndex = 0;
let tickCount = 0;
let isKeyPressed = false; 
let isTurnedLeft = true; 

// Handle key presses to move the object
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37 && marioX > 0) {
    marioImg = marioLeftImg;
    marioX -= marioSpeed;
    isKeyPressed = true; // Start the animation when a key is pressed
  } else if (event.keyCode == 39 && marioX < canvas.width - 50) {
    marioImg = marioRightImg;
    marioX += marioSpeed;
    isKeyPressed = true; // Start the animation when a key is pressed
  }
});

document.addEventListener("keyup", function(event) {
  isKeyPressed = false; // Stop the animation when the key is released
 // frameIndex = 0;
});

// Update the sprite animation
function updateAnimation() {
  if (isKeyPressed) { // Only update the animation if a key is pressed
    tickCount++;

    if (tickCount % 5 === 0) {
      frameIndex++;

      if (frameIndex > 2) {
        frameIndex = 0;
      }
    }
  }
}

// Move the falling object and check for collision
function update() {
  updateAnimation();
  turtleY += turtleSpeed;

  if (turtleY > canvas.height) {
    // Reset the turtle's position when it goes off the bottom of the canvas
    turtleX = Math.random() * (canvas.width - 50);
    turtleY = -50;
  }

  // Check for collision
  if (turtleX < marioX + 50 &&
      turtleX + 50 > marioX &&
      turtleY < marioY + 50 &&
      turtleY + 50 > marioY) {
    // Collision detected
    score++;
    turtleX = Math.random() * (canvas.width - 50);
    turtleY = -50;
  }
}

// Draw the objects on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the score
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.fillText("Score: " + score, canvas.width - 10, 30);

  // Draw the objects
  ctx.drawImage(marioImg, frameIndex * marioImg.width / 3, 0, marioImg.width / 3, marioImg.height, marioX, marioY, marioImg.width / 3, marioImg.height);
  ctx.drawImage(turtleImg, turtleX, turtleY, 50, 50);
}

// Run the game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Start the game loop
loop();

 


