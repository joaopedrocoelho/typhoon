// gets a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
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

//team 1
let team1Points = document.getElementById("team1");
team1Points.innerHTML = 0;
//team 2
let team2Points = document.getElementById("team2");
team2Points.innerHTML = 0;
// //team 3
// let team3Points = document.getElementById("team3");
// team3Points.innerHTML = 0;
// //team 4
// let team4Points = document.getElementById("team4");
// team4Points.innerHTML = 0;
// //team 5
// let team4Points = document.getElementById("team4");
// team4Points.innerHTML = 0;*/

let teamsArr = [1, 2, 3];
let whoPlayed = teamsArr.indexOf(1);

// Typhoon GIF visibility
function makeVisible(status) {
  let TyphoonGif = document.getElementById("TyphoonGif");
  if (status == "visible") {
    TyphoonGif.style.visibility = "visible";
  } else {
    TyphoonGif.style.visibility = "hidden";
  }
}
//assign points to a Team
function assignPoints(points) {
  if (points == "T") {
    window.setTimeout(makeVisible, 500, "visible");
    window.setTimeout(makeVisible, 2000, "hidden");
    //check who's turn is it1
    switch (whoPlayed) {
      case 0:
        team1Points.innerHTML = parseInt(team1Points.innerHTML) - 3;
        whoPlayed += 1;
        break;
      case 1:
        team2Points.innerHTML = parseInt(team2Points.innerHTML) - 3;
        whoPlayed -= 1;
        break;
      // case 2:
      //   team3Points.innerHTML = parseInt(team3Points.innerHTML) - 3;
      //   whoPlayed = teamsArr.indexOf(1);
      //   break;
    }
  } else {
    //check who's turn is it
    switch (whoPlayed) {
      case 0:
        team1Points.innerHTML =
          parseInt(team1Points.innerHTML) + parseInt(points);
        whoPlayed += 1;
        break;
      case 1:
        team2Points.innerHTML =
          parseInt(team2Points.innerHTML) + parseInt(points);
        whoPlayed -= 1;
        break;
      // case 2:
      //   team3Points.innerHTML =
      //     parseInt(team3Points.innerHTML) + parseInt(points);
      //   whoPlayed = teamsArr.indexOf(1);
      //   break;
    }
  }
}

//shows the points when the cell is clicked
function showPoints() {
  event.target.style.fontSize = "4vw";
  assignPoints(event.target.innerHTML);
}
