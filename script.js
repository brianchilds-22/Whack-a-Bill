// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  const startButton = document.getElementById("startButton");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const finalMessage = document.getElementById("finalMessage");
  const holes = document.querySelectorAll(".hole");

  //   Select sounds
  const bonkSound = document.getElementById("bonk");
  const overSound = document.getElementById("over");
  const highSound = document.getElementById("high");

  highSound.volume = 0.2;
  overSound.volume = 0.2;

  let score = 0;
  let timer;
  let countdown;

  // Function to handle clicking on holes
  function handleClick() {
    if (!this.classList.contains("active")) return; // If hole is not active, do nothing
    score++; // Increment score
    scoreDisplay.textContent = `Score: ${score}`; // Update score display
    // this.classList.remove("active"); // Deactivate hole
    // Toggle red border class for the clicked image
    // const image = this.querySelector("img");
    // image.classList.toggle("clicked");
    bonkSound.currenttime = 0; // Reset bonk sound
    bonkSound.play(); // Play bonk sound

    this.classList.remove("active"); // Deactivate hole
  }

  // Function to start the game
  function startGame() {
    score = 0; // Reset score
    timer = 30;
    isPlaying = true; // Set isPlaying to true
    startButton.disabled = true;
    startButton.textContent = "Playing..."; // Change button text
    scoreDisplay.textContent = `Score: ${score}`; // Update score display
    finalMessage.textContent = ""; // Clear final message

    // Function to randomly activate a hole
    function activateHole() {
      const randomIndex = Math.floor(Math.random() * holes.length);
      const hole = holes[randomIndex];
      hole.classList.add("active"); // Activate hole

      // Set timeout for hole deactivation
      setTimeout(() => {
        hole.classList.remove("active"); // Deactivate hole
      }, 600); // 1000ms = 1 second
    }

    // Activate hot6es at random intervals
    countdown = 30; // Set countdown timer to 30 seconds
    timerDisplay.textContent = `Time Left: ${countdown}`; // Update timer display
    timer = setInterval(() => {
      countdown--; // Decrement countdown
      timerDisplay.textContent = `Time Left: ${countdown}`; // Update timer display

      if (countdown <= 0) {
        clearInterval(timer); // Stop the timer
        finalMessage.textContent = `Game Over! Your score is ${score}. ${getFinalMessage()}`; // Display final message
        startButton.textContent = `Play Again?`;
        startButton.disabled = false;
        // overSound.play(); // Play over sound
        score > 20 ? highSound.play() : overSound.play(); // Play high sound
        // if (score > 20) {
        //   highSound.play(); // Play high sound
        // }
      } else {
        activateHole();
        // Activate a random hole
      }
    }, 1000); // 1000ms = 1 second
  }

  // Function to generate a final message based on the score
  function getFinalMessage() {
    if (score === 0) {
      return "Turnover!";
    } else if (score < 10) {
      return "You can do better!";
    } else if (score < 20) {
      return "Great job!";
    } else {
      return "You're a Whack master!";
    }
  }

  // Event listener for clicking on holes
  holes.forEach((hole) => hole.addEventListener("click", handleClick));

  // Event listener for clicking the start button
  startButton.addEventListener("click", startGame);
});
