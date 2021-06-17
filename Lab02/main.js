// current player turn
const turnDisplay = document.getElementsByClassName("display_player");

// current score
const scoreDisplay1 = document.getElementsByClassName("score1");
const scoreDisplay2 = document.getElementsByClassName("score2");

var player1Score = 0; // score for player X
var player2Score = 0; // score for player O

let currentPlayer = "X"; // whether current player is X or O

let active = true; // checks if game is still in play

let ai = false; //check is user is playing against ai

var squares = ["", "", "", "", "", "", "", "", ""]; // moves of player X and O

// winning conditions for the game
const conditions = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 1, 2],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// prepares all elements of the game
function start() {

    active = true;
    currentPlayer = "X";

    turnDisplay[0].innerHTML = currentPlayer;
    scoreDisplay1[0].innerHTML = `${player1Score}`;
    scoreDisplay2[0].innerHTML = `${player2Score}`;

    squares = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".xo").forEach((xo) => (xo.innerHTML = ""));
}

// handles clicks in a cell
function squareClicked(element, index) {
    if (squares[index - 1] !== "" || !active) {
        return;
    }
  //  console.log("current player " + currentPlayer + " index " + index);
    squares[index - 1] = currentPlayer; // set square[index-1] with X or O
    element.innerHTML = "<span class='xo' >" + currentPlayer + "</span>";
    checkEnd();
}


// check if the game has ended
function checkEnd() {
    var win = false;
    for (let i = 0; i < conditions.length; i++) {
        let a = squares[conditions[i][0]];
        let b = squares[conditions[i][1]];
        let c = squares[conditions[i][2]];
        // console.log("A:", a, "B:", b, "C:", c);

        // if at least one pieces in a row is empty, no winner, continue
        if (a === "" || b === "" || c === "") {
            continue;
        }
        // if three pieces of X or O are in a row
        if (a === b && b === c) {
            win = true;
            break;
        }
    }
    // if a winner is found
    if (win) {
        // sets a delay before outputing alert
        setTimeout(function () {alert(`Player ${currentPlayer} wins!`);}, 1);

        // increment winner's score
        currentPlayer == "X" ? player1Score++ : player2Score++;
        scoreDisplay1[0].innerHTML = `${player1Score}`;
        scoreDisplay2[0].innerHTML = `${player2Score}`;
        active = false;
        return;
    } 
    // if no winner and all squares occupied by either X or O
    else if (!squares.includes("")) {
        setTimeout(function () {alert(`Tie!`);}, 1);
        active = false;
        return;
    }

    update();
    if((currentPlayer == "O") && (ai)){
        setTimeout(function(){AIturn(); }, 150);
     //   AIturn();
    }
}

function AIturn(){
    var randnum = Math.floor(Math.random() * 9); // random integer 0-8
   // console.log("ai num1 " + randnum);
    while (squares[randnum-1] !== "" ){ //if square is already full, pick another number
    //    console.log("reroll " + randnum);
        randnum = Math.floor(Math.random() * 9);
    }
 //   console.log("ai num" + randnum);
    squareClicked(document.getElementById(randnum) ,randnum); 
}

function setbot(){ //sets opponent to AI
    ai = true;
    hide();
}

function hide(){ //hides opponent choice buttons & starts game
    document.getElementById("pvp").style.display = "none";
    document.getElementById("PvsAI").style.display = "none";
    document.getElementById("turn").style.display = "block";
    start();
}

function unhide(){ //shows choice button
    document.getElementById("pvp").style.display = "block";
    document.getElementById("PvsAI").style.display = "block";
    document.getElementById("turn").style.display = "none";
}

// updates whose turn it is
function update() {
    // if the current player is x, set current player to O
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnDisplay[0].innerHTML = currentPlayer;
}

function newGame() {
    start();
}

function reset() { //resets board and score
    player1Score = player2Score = 0;
    unhide();
    start();
}