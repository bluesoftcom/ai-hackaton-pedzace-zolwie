var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

var difficulty_level = urlParams.get('difficulty_level');

// Define the canvas element
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = 0;
let timer = urlParams.get('time');
let audio = new Audio("mario-theme-song.mp3");
let backgroundImg = new Image();

backgroundImg.src = "mario_background.jpg";

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;

// Define the moving object

let marioLeftImg = new Image();
marioLeftImg.src = "mario-left.png";

let marioRightImg = new Image();
marioRightImg.src = "mario-right.png";

let marioImg = marioLeftImg;
let marioSize = marioLeftImg.width / 3;
let marioX = canvas.width / 2;
let marioY = canvas.height - 140;
let marioSpeed = 30;

// Define the falling object
let timeBetweenTurtles = 2; // 2 seconds between turtles
let lastTurtleTime = 0;
let turtles = [];
let turtleImg = new Image();
turtleImg.src = "coin.png";
let turtleSize = 50; // Set the desired size of the image
let turtleX = Math.random() * (canvas.width - turtleSize);
let turtleY = -turtleSize;
let turtleSpeed = 5;

// Add variables for sprite animation
let frameIndex = 0;
let tickCount = 0;
let isKeyPressed = false; 

// Define the keydown event handler function
function keydownHandler(event) {
  if (event.keyCode == 37 && marioX > 0) {
    marioImg = marioLeftImg;
    marioX -= marioSpeed;
    isKeyPressed = true; // Start the animation when a key is pressed
  } else if (event.keyCode == 39 && marioX < canvas.width - 50) {
    marioImg = marioRightImg;
    marioX += marioSpeed;
    isKeyPressed = true; // Start the animation when a key is pressed
  }
};

// Add the keydown event listener
document.addEventListener("keydown", keydownHandler);

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

function createTurtle() {
  // Check the time since the last turtle was created
  let currentTime = new Date().getTime();
  let timeSinceLastTurtle = (currentTime - lastTurtleTime) / 1000; // Convert to seconds
  if (timeSinceLastTurtle < timeBetweenTurtles) {
    return; // Don't create a new turtle yet
  }

  // Create a new turtle
  let turtle = {
    x: Math.random() * (canvas.width - turtleSize),
    y: -turtleSize,
    speed: Math.random() * (10 - 2) + 2 // Set a random speed between 2 and 10
  };
  turtles.push(turtle);

  // Update the time of the last turtle creation
  lastTurtleTime = currentTime;
}


// Move the falling object and check for collision
function update() {
  updateAnimation();
  // Move all turtles
  for (let i = 0; i < turtles.length; i++) {
    turtles[i].y += turtles[i].speed;

    if (turtles[i].y > canvas.height) {
      // Reset the turtle's position when it goes off the bottom of the canvas
      turtles[i].x = Math.random() * (canvas.width - turtleSize);
      turtles[i].y = -turtleSize;
    }

    // Check for collision
    if (turtles[i].x < marioX + marioSize &&
      turtles[i].x + turtleSize > marioX &&
      turtles[i].y < marioY + marioSize &&
      turtles[i].y + turtleSize > marioY) {
      // Collision detected
      score++;
      turtles.splice(i, 1); // Remove the turtle from the array
      i--;
    }
  }

  // Decrement the timer every frame
  if (timer > 0) {
    timer -= 1 / 60; // Subtract 1/60th of a second (the frame rate) from the timer
  } else {
    // Game over when the timer reaches 0
    alert("Game over! Your score is " + score);
    window.location.href = "form.html";
  }
}

// Draw the objects on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height + 110);  // Draw the score and timer
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "right";
  ctx.fillText("Score: " + score, canvas.width - 10, 30);
  ctx.fillText("Time: " + timer.toFixed(1), canvas.width - 10, 60); // Add the timer to the scorecard

  // Draw the objects
  ctx.drawImage(marioImg, frameIndex * marioImg.width / 3, 0, marioImg.width / 3, marioImg.height, marioX, marioY, marioImg.width / 3, marioImg.height);

 // Loop through the turtles array and draw each turtle
   for (let i = 0; i < turtles.length; i++) {
      ctx.drawImage(turtleImg, turtles[i].x, turtles[i].y, turtleSize, turtleSize);
    }
}

// Run the game loop
let timeSinceLastTurtle = 0;
function loop() {
    // Check if the game is over
    if (timer <= 0) {
      // Game over
      document.removeEventListener("keydown", keydownHandler);
      alert("Game over! Your score is " + score);
      window.location.href = "form.html";
      return;
    }
  update();
  draw();

  // Create a new turtle after the specified time has elapsed
  timeSinceLastTurtle += 1 / 60; // Increase the time by the frame time (1/60th of a second)
  if (timeSinceLastTurtle > timeBetweenTurtles) {
    createTurtle();
    timeSinceLastTurtle = 0;
  }

  requestAnimationFrame(loop);
}

audio.play();

// Start the game loop
loop();