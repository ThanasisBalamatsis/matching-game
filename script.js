import {createGrid,numberGridItems} from './src/grid.js';
import { removeGridItems } from './src/logic.js';
import { resetScore } from './src/score.js';
import { displayScores } from './src/message.js';

const newGameBtn = document.getElementById("new-game-btn");

newGameBtn.addEventListener("click", function() {
    removeGridItems();
    createGrid(numberGridItems);
    resetScore();
    displayScores();
})

createGrid(numberGridItems);




















