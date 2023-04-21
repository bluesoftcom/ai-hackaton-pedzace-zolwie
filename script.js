// Define the canvas element
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 0;
let timer = 10; // Set the timer to 10 seconds

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the moving object
let marioImg = new Image();
marioImg.src = "mario.png";
let marioX = canvas.width / 2;
let marioY = canvas.height - 50;
let marioSpeed = 20;

// Define the falling object
let turtleImg = new Image();
turtleImg.src = "turtle.png";
let turtleX = Math.random() * (canvas.width - 50);
let turtleY = -50;
let turtleSpeed = 5;

// Handle key presses to move the object
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37 && marioX > 0) {
    marioX -= marioSpeed;
  } else if (event.keyCode == 39 && marioX < canvas.width - 50) {
    marioX += marioSpeed;
  }
});

// Move the falling object and check for collision
function update() {
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

  // Decrement the timer every frame
  if (timer > 0) {
    timer -= 1 / 60; // Subtract 1/60th of a second (the frame rate) from the timer
  } else {
    // Game over when the timer reaches 0
    alert("Game over! Your score is " + score);
    document.location.reload();
  }
}

// Draw the objects on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the score and timer
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.fillText("Score: " + score, canvas.width - 10, 30);
  ctx.fillText("Time: " + timer.toFixed(1), canvas.width - 10, 60); // Add the timer to the scorecard

  // Draw the objects
  ctx.drawImage(marioImg, marioX, marioY, 50, 50);
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
