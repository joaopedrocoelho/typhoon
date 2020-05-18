// gets a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// Typhoon GIF visibility
function makeVisible(status) {
  let TyphoonGif = document.getElementById("TyphoonGif");
  if (status == "visible") {
    TyphoonGif.style.visibility = "visible";
  } else {
    TyphoonGif.style.visibility = "hidden";
  }
}

//points of the game
const possibleValues = [1, 2, 3, 4, "T"];

// selects all the cells
const places = document.getElementsByClassName("place");

//assign random numbers to each cell
function assignValues() {
  for (let i = 0; i <= places.length - 1; i++) {
    places[i].innerHTML = possibleValues[getRandomInt(0, 4)];
  }
}

assignValues();

//assign 5 Ts randomly
function assignTs() {
  for (let i = 0; i <= 5; i++) {
    places[getRandomInt(0, 24)].innerHTML = possibleValues[4];
  }
}

assignTs();

//assign points to a Team
const NUM_PLAYERS = 2;

// Make an array filled with 0s, with a length of NUM_PLAYERS:
const scores = Array.from({ length: NUM_PLAYERS }, () => 0);

let activePlayerIndex = 0;

//assign points to a Team
function assignPoints(points) {
  if (points !== "T") {
    scores[activePlayerIndex] += parseInt(points);
    document.getElementById("team" + (activePlayerIndex + 1)).innerHTML =
      scores[activePlayerIndex];
    activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  } else {
    scores[activePlayerIndex] -= 3;
    document.getElementById("team" + (activePlayerIndex + 1)).innerHTML =
      scores[activePlayerIndex];
    activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  }
}

//shows the points when the cell is clicked
function showPoints() {
  event.target.style.fontSize = "4vw";
  assignPoints(event.target.innerHTML);
}
