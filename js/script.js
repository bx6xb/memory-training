// Plan:
// 1 Fill array with random numbers
// 2 Show these numbers on the grid
// 2.1 Firstly, to do it I need function that show it and within 1 second hide it back
// 2.2 I need to set interval for this function
//
// How this script works:
// 1 Generating random order of number from 0 to 8
// 2 Script shows numbers in random order in the grid, submit button is hided, fields are not clickable
// 3 Fields are clickable, when user clicks on fields he picks the order of numbers that was shown before
// After he picked the order the submit button is active
// 4 If order is correct level and score are increases, otherwise level turning back to first, score is recorded,
// background blinks and grid shakes

// Script variables
var arrayOfRandomNums = [];
var arrayOfUserNums = [];
var localLevel = 1;
var localScore = 0;
var time = 1000;
var pickFieldCount = 1;

// HTML elements variables
var body = document.getElementsByTagName("body")[0];
var grid = document.getElementById("grid");
var fields = document.getElementsByClassName("field");
var level = document.getElementById("level");
var score = document.getElementById("score");
var restart = document.getElementById("restart");
var startScreen = document.getElementById("start-screen");
var playBtn = document.getElementById("play-button");
var submit = document.getElementById("submit");
var dark = document.getElementById("dark");
var bright = document.getElementById("bright");
var ru = document.getElementById("ru-lang");
var eng = document.getElementById("eng-lang");

// Makes grid and each field in it clickable
function gridUnclickable() {
  grid.style.pointerEvents = "none";
  grid.style.cursor = "not-allowed";
}

// Makes grid and each field in it unclickable
function gridClickable() {
  grid.style.pointerEvents = "auto";
  grid.style.cursor = "pointer";
}

// Makes restart button clickable or unclickable
function restartCheck() {
  if (pickFieldCount > 1) {
    restart.style.pointerEvents = "auto";
    restart.style.cursor = "pointer";
    restart.style.opacity = "1";
  } else {
    restart.style.pointerEvents = "none";
    restart.style.cursor = "not-allowed";
    restart.style.opacity = "0.2";
  }
}

// Makes submit button clickable or unclickable
function submitCheck() {
  if (pickFieldCount === 10) {
    submit.style.opacity = "1";
    submit.style.cursor = "pointer";
    submit.style.pointerEvents = "auto";
  } else {
    submit.style.opacity = "0.2";
    submit.style.cursor = "not-allowed";
    submit.style.pointerEvents = "none";
  }
}

// Starts game
function startGame() {
  gridUnclickable();
  setTimeout(function () {
    randomFillArray();
    show();
  }, 2000);
}

// Restarts the game from the first level
function gameRestart() {
  restartGrid();
  localLevel = 1;
  level.innerHTML = `Level ${localLevel}`;
  startGame();
}

// Fills in numbers in the array
function randomFillArray() {
  if (arrayOfRandomNums !== []) {
    arrayOfRandomNums = [];
  }
  while (arrayOfRandomNums.length !== 9) {
    let num = Math.ceil(9 * Math.random()) - 1;
    if (!arrayOfRandomNums.includes(num)) {
      arrayOfRandomNums.push(num);
    }
  }
  console.log(arrayOfRandomNums);
}

// Shows fields in the grid
function show() {
  for (let i = 0; i < arrayOfRandomNums.length; i++) {
    setTimeout(function () {
      let serialNum = arrayOfRandomNums[i];
      fields[serialNum].innerHTML = `<div class="selected">${i + 1}</div>`;
    }, 1000 * i);
    setTimeout(function () {
      let serialNum = arrayOfRandomNums[i];
      fields[serialNum].innerHTML = "";
      if (i + 1 === arrayOfRandomNums.length) {
        gridClickable();
      }
    }, 500 + 1000 * i);
  }
}

// Clears the grid
function restartGrid() {
  for (let i = 0; i < fields.length; i++) {
    fields[i].innerHTML = "";
  }
  arrayOfUserNums = [];
  pickFieldCount = 1;
  submitCheck();
  restartCheck();
}

// Event listener for play button on the start screen
playBtn.addEventListener("click", function () {
  startScreen.classList.add("hide-object");

  setTimeout(function () {
    startScreen.style.display = "none";
  }, 500);

  // Make fields clickable
  for (let i = 0; i < fields.length; i++) {
    let elem = fields[i];
    // Adds event listener to each field
    elem.addEventListener("click", function () {
      if (elem.innerHTML === "") {
        elem.innerHTML = `<div class="selected">${pickFieldCount}</div>`;
        arrayOfUserNums.push(i);
        pickFieldCount++;
        submitCheck();
        restartCheck();
      } else {
        arrayOfUserNums.splice(arrayOfUserNums.indexOf(i), 1);
        elem.innerHTML = "";
        pickFieldCount--;
        submitCheck();
        restartCheck();
      }
    });
  }

  startGame();
});

// Event listener for submit button
submit.addEventListener("click", function () {
  if (arrayOfRandomNums.join("") === arrayOfUserNums.join("")) {
    body.classList.add("green-bg");
    setTimeout(function () {
      body.classList.remove("green-bg");
    }, 500);

    if (localScore < localLevel) {
      score.innerHTML = `Score: ${++localScore}`;
    }

    level.innerHTML = `Level ${++localLevel}`;

    restartGrid();
    startGame();
  } else {
    body.classList.add("red-bg");
    grid.classList.add("shake-object");
    setTimeout(function () {
      body.classList.remove("red-bg");
      grid.classList.remove("shake-object");
    }, 500);
    gameRestart();
  }
});

// Event listener for restart button
restart.addEventListener("click", function () {
  restartGrid();
});
