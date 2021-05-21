// gets a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// Typhoon GIF visibility
const audio = new Audio("sounds/typhoon.mp3");
function makeVisible(status) {
  let TyphoonGif = document.getElementById("TyphoonGif");
  if (status == "visible") {
    audio.play();
    setTimeout(() => (TyphoonGif.style.visibility = "visible"), 3000);
    setTimeout(() => (TyphoonGif.style.visibility = "hidden"), 7000);
  } else {
    TyphoonGif.style.visibility = "hidden";
  }
}

//points of the game
const possibleValues = [1, 2, 3, 4, "T"];

// selects all the cells
const places = document.getElementsByClassName("place");

console.log("places", places.innerText);

//assign random numbers to each cell
function assignValues() {
  for (let i = 0; i <= places.length - 1; i++) {
    places[i].innerHTML = possibleValues[getRandomInt(0, 4)];
  }
}

assignValues();

//assign 5 Ts randomly
function assignTs() {
  for (let i = 0; i <= 4; i++) {
    places[getRandomInt(0, 24)].innerHTML = possibleValues[4];
  }
}

assignTs();

/* generate T value */
let valueOfT = [];
// let giveOrLose = ["win", "lose"];
let giveOrLoseObject = {
  win: (number1, number2) => number1 + number2,
  lose: (number1, number2) => number1 - number2,
};
let giveOrLoseArr = Object.keys(giveOrLoseObject);
let tPoints = [3, 4, 5, 6];

/* modal generate T */
function generateT() {
  document.getElementById("T").innerText = "T = ";
  valueOfT = [
    giveOrLoseArr[getRandomInt(0, 2)],
    tPoints[getRandomInt(0, 4)],
    // tPointsToWho[getRandomInt(0, 2)],
  ];
  let stringOfT = `${valueOfT[0]} ${valueOfT[1]} 
    point(s)`;
  document.getElementById("T").insertAdjacentText("beforeend", stringOfT);
}
generateT();
/* assign T points */
function getTPoints(number1, number2) {
  if (giveOrLoseArr[0] == valueOfT[0]) {
    return giveOrLoseObject.win(number1, number2);
  } else {
    return giveOrLoseObject.lose(number1, number2);
  }
}

/* game options */

// set number of teams
function addOrRemoveTeam(operator) {
  let currentValue = parseInt(
    document.getElementById("numberOfTeams").innerText
  );
  if (currentValue < 5 && operator == "add") {
    document.getElementById("numberOfTeams").innerText = currentValue + 1;
  }
  if (currentValue > 1 && operator == "remove") {
    document.getElementById("numberOfTeams").innerText = currentValue - 1;
  }
}

/*assign teams */
//assign number of Teams
let NUM_PLAYERS = 0;
let scores = [];

/* start the game */
let table = document.getElementById("game");
let modal = document.getElementById("gameOptions");

function startGame() {
  NUM_PLAYERS = document.getElementById("numberOfTeams").innerText;
  createTeams(NUM_PLAYERS);
  // Make an array filled with 0s, with a length of NUM_PLAYERS:
  scores = Array.from({ length: NUM_PLAYERS }, () => 0);
  highlightPlayer();
  //modal close animations

  console.log(NUM_PLAYERS, typeof NUM_PLAYERS);
  table.style.animationName = "unBlur";
  setTimeout(
    () => (
      (table.style.filter = "none"),
      (table.style.opacity = "1"),
      (table.style.pointerEvents = "auto"),
      (modal.style.visibility = "hidden"),
      (modal.style.animationDuration = "1s"),
      (modal.style.animationName = "disappear")
    ),
    1000
  );
}

//create teams on HTML
function createTeams(number) {
  for (i = 1; i <= number; i++) {
    let team = `<div class="team">
    <h4 id="teamName${i - 1}">Team ${i}</h4>
    <span class="points" id="team${i}"></span>
  </div>`;
    document
      .getElementById("teamsContainer")
      .insertAdjacentHTML("beforeend", team);
  }
}

//assign points to a Team
let activePlayerIndex = 0;

// assign T points

function assignPoints(points) {
  if (points !== "T") {
    scores[activePlayerIndex] += parseInt(points);
    document.getElementById("team" + (activePlayerIndex + 1)).innerHTML =
      scores[activePlayerIndex];
    activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  } else {
    makeVisible("visible");
    scores[activePlayerIndex] = getTPoints(
      scores[activePlayerIndex],
      valueOfT[1]
    );
    document.getElementById("team" + (activePlayerIndex + 1)).innerHTML =
      scores[activePlayerIndex];
    activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  }

  highlightPlayer();
}

/* end game */
const disabledPlaces = [];
const gameOver = document.getElementById("gameOver");
gameOver.style.visibility = "hidden";
const celebrationGifsArr = [
  "img/celebration/funny-celebrate-5.gif",
  "img/celebration/funny-celebrate-8.gif",
  "img/celebration/funny-celebrate-14.gif",
  "img/celebration/funny-celebrate-56.gif",
  "img/celebration/pokemon.gif",
  "img/celebration/tenor.gif",
];
const random = Math.floor(Math.random() * celebrationGifsArr.length);

let winners; //will return the indexes of the winners
let winMessage = document.getElementById("winners");
const celebrationGif = document.getElementById("celebrationGif");

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

function checkWinner() {
  const highestScore = Math.max(...scores);
  winners = getAllIndexes(scores, highestScore);
  const winningTeams = winners.map(
    (e) => document.getElementById(`teamName${e}`).innerText
  );
  winMessage.innerText = `${winningTeams} won!`;
  celebrationGif.src = celebrationGifsArr[random];
}

//shows the points when the cell is clicked
function showPoints(event) {
  let scorePopUpBox = document.getElementById("scorePopUpBox");
  let scorePopUp = document.getElementById("scorePopUp");
  event.target.style.fontSize = "4vw";
  event.target.className = "Rtable-cell place disabled";
  disabledPlaces.push(event.target);
  assignPoints(event.target.innerHTML);

  scorePopUp.innerText = event.target.innerText;
  scorePopUpBox.style.visibility = "visible";
  scorePopUpBox.style.animationName = "jumpInLeft";
  setTimeout(
    () => (
      (scorePopUpBox.style.animationDuration = "1s"),
      (scorePopUpBox.style.animationName = "jumpOutRight")
    ),
    1500
  );
  setTimeout(() => (scorePopUpBox.style.visibility = "hidden"), 2500);
  console.log("disabledPlaces.length", disabledPlaces.length);
  if (disabledPlaces.length === 25) {
    setTimeout(
      () => (
        (gameOver.style.animationName = "bounceInDown"),
        (gameOver.style.visibility = "visible"),
        (table.style.filter = "blur(5px)"),
        (table.style.opacity = "0.7"),
        (table.style.pointerEvents = "none")
      ),
      2000
    );

    checkWinner();
  }
}

// skip turn button
function skipTurn() {
  activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  highlightPlayer();
}

//highlights current player
function highlightPlayer() {
  document.getElementById(
    "teamName" + (activePlayerIndex % NUM_PLAYERS)
  ).style.color = "red";
  if (activePlayerIndex > 0 && activePlayerIndex < NUM_PLAYERS) {
    document.getElementById(
      "teamName" + ((activePlayerIndex - 1) % NUM_PLAYERS)
    ).style.color = "black";
  } else {
    document.getElementById("teamName" + (NUM_PLAYERS - 1)).style.color =
      "black";
  }
}
