// Game Values
let min = 1,
  max = 10,
  winning_number = getRandomNumber(min, max),
  guesses_left = 3;
  console.log(winning_number);
// IU elements
const game_UI = document.querySelector("#game"),
  minNumber_UI = document.querySelector(".min-number"),
  maxNumber_UI = document.querySelector(".max-number"),
  guessBtn_UI = document.querySelector("#guess-btn"),
  guessInput_UI = document.querySelector("#guess-input"),
  message_UI = document.querySelector(".message");
// Play again event listener
game_UI.addEventListener('mousedown', function(event_param){
 if(event_param.target.className ==='play-again'){
    window.location.reload();
 }
});
// Assign UI min and max
minNumber_UI.textContent = min;
maxNumber_UI.textContent = max;
// Listen for guess
guessBtn_UI.addEventListener("click", function() {
  let guess = parseInt(guessInput_UI.value);
  // Validate input
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // Check if player won
  else if (guess === winning_number) {
    // GAME OVER - WON
    gameOver(true, `${winning_number} is correct, great job, YOU ARE A WINNER! :)`);
  }else {
    // Wrong number
    guesses_left -= 1;
    // guesses left
    if (guesses_left === 0) {
      // GAME OVER - LOST
      gameOver(false,`GAME OVER(the correct number was ${winning_number}), DON'T GIVE UP, TRY AGAIN`);
      
    } else {
      // game continues - answer wrong
      if(guess > winning_number){
        guess-=1;
        setMessage(`Too high ${guesses_left} guesses left`, "red");
      }else if(guess < winning_number){
        guess-=1;
        setMessage(`Too low ${guesses_left} guesses left`, "red");
      }
      else{     
      // change border color
      guessInput_UI.style.borderColor = "red";
      //Clean input
      guessInput_UI.value = "";
      // notify the player about guesses left
      setMessage(`${guess} is not correct, ${guesses_left} guesses left`, "red");
    }
    }
  }
});

// setMessage function
function setMessage(message, color) {
  message_UI.style.color = color;
  message_UI.textContent = message;
}
// game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // disable input
  guessInput_UI.disabled = true;
  // change border color
  guessInput_UI.style.borderColor = color;
  // set message(let the player know he won)
  setMessage(msg, color);
  // Play again
  guessBtn_UI.value='Play again';
  guessBtn_UI.className += 'play-again';
}
// getWinningNum function
function getRandomNumber(min, max){
    return Math.floor(Math.random() *(max-min+1)) + min;
}
