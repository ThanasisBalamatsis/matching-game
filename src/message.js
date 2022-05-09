import {scores, currentPlayerIndex} from "./score.js"

let playerOneScore = document.getElementById("player-one-score");
let playerTwoScore = document.getElementById("player-two-score");
let messageElement = document.getElementById("message");
let currentPlayerElement = document.getElementById("current-player");

export function displayScores() {
    playerOneScore.textContent = `Player 1 Score: ${scores[0]}`;
    console.log(playerOneScore.textContent);
    playerTwoScore.textContent = `Player 2 Score: ${scores[1]}`;
    console.log(playerTwoScore.textContent);
}

export function displayMessage(message) {
    messageElement.textContent = message;
}

export function displayCurrentPlayer() {
    (currentPlayerIndex === 0) ? currentPlayerElement.textContent = "Player 1 Turn" : currentPlayerElement.textContent = "Player 2 Turn";
}