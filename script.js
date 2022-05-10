import {createGrid,numberGridItems} from './src/grid.js';
import { removeGridItems } from './src/logic.js';
import { resetScore } from './src/score.js';
import { displayScores } from './src/message.js';

const newGameButton = document.getElementById("new-game-btn");

newGameButton.addEventListener("click", function() {
    removeGridItems();
    createGrid(numberGridItems);
    resetScore();
    displayScores();
})

createGrid(numberGridItems);




















