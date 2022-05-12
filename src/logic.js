import {activeGridItemsIndices, createGrid, numberGridItems} from "./grid.js"
import {increaseScore, decreaseScore, changeCurrentPlayerIndex} from "./score.js"
import {displayScores, displayMessage, displayCurrentPlayer} from "./message.js"

let lastTwoClickedIndices = [];
let message;

export function runGameLogic(index, image) {

    addToLastTwoClickedIndices(index);

    // if penalty image is clicked
    if (image.src.includes("hole")) {
        makeGridItemsUnclickable();
        removeLastClickedFromActiveGridIndices(index);
        decreaseScore();
        message = "Oops! Penalty!";
        runStandardSequenceBeforeTimeout(message);
        setTimeout(function() {
            hideImages();
            runStandardSequenceAfterTimeout();
        }, 1500);

    }
    else if (lastTwoClickedIndices.length === 2) {
        
        if (checkIfThereIsMatching()) {
            makeGridItemsUnclickable();  
            removeLastTwoClickedFromActiveGridIndices();
            increaseScore();
            message = "Nice!They match!";
            runStandardSequenceBeforeTimeout(message);
            setTimeout(function() {
                runStandardSequenceAfterTimeout();
            }, 1500);

        }
        else {
            makeGridItemsUnclickable();
            message = "They don't match!";
            runStandardSequenceBeforeTimeout(message);
            setTimeout(function() {
                hideImages();
                runStandardSequenceAfterTimeout();
            }, 1500);
        }
    }
}

function runStandardSequenceBeforeTimeout(message) {   
    changeCurrentPlayerIndex();
    displayScores();
    displayMessage(message);
}

function runStandardSequenceAfterTimeout() {
    lastTwoClickedIndices = [];
    makeGridItemsClickable();
    displayCurrentPlayer();
    displayMessage("Ready to play!");

    // if all images are revealed => recreate grid
    if (activeGridItemsIndices.length === 0 ) {
        runStandardSequenceToRecreateGrid();
    }    
}

function runStandardSequenceToRecreateGrid() {
    removeGridItems();
    createGrid(numberGridItems);
}

function addToLastTwoClickedIndices(index) {
    if (lastTwoClickedIndices.length === 2) {
        lastTwoClickedIndices = [];
    } 
    lastTwoClickedIndices.push(index);
}

function checkIfThereIsMatching() {    

    const firstClicked = document.getElementById(`grid-item-${[lastTwoClickedIndices[0]]}`);
    const secondClicked = document.getElementById(`grid-item-${[lastTwoClickedIndices[1]]}`);
        
    if (firstClicked.firstChild.src === secondClicked.firstChild.src) {
        return true;
    }

    return false;
}

function hideImages() {

    const firstClicked = document.getElementById(`grid-item-${[lastTwoClickedIndices[0]]}`);

    if (lastTwoClickedIndices.length === 2) {

        const secondClicked = document.getElementById(`grid-item-${[lastTwoClickedIndices[1]]}`);

        if (!firstClicked.firstChild.src.includes("hole")) {
            firstClicked.firstChild.classList.add("hidden");
        }

        if (!secondClicked.firstChild.src.includes("hole")) {
            secondClicked.firstChild.classList.add("hidden");
        }
    }
    else {

        if (!firstClicked.firstChild.src.includes("hole")) {
            firstClicked.firstChild.classList.add("hidden");
        }
    }
}

function makeGridItemsUnclickable() {
    
    for (const index of activeGridItemsIndices) {
        const gridItem = document.getElementById(`grid-item-${index}`);
        gridItem.classList.add("unclickable");
    }

}

function makeGridItemsClickable() {
    
    for (const index of activeGridItemsIndices) {
        const gridItem = document.getElementById(`grid-item-${index}`);
        gridItem.classList.remove("unclickable");
    }

}

function removeLastTwoClickedFromActiveGridIndices() {

    let indexOfClicked = activeGridItemsIndices.indexOf(lastTwoClickedIndices[0]);
    activeGridItemsIndices.splice(indexOfClicked, 1);

    indexOfClicked = activeGridItemsIndices.indexOf(lastTwoClickedIndices[1]);
    activeGridItemsIndices.splice(indexOfClicked, 1);
}

function removeLastClickedFromActiveGridIndices(index) {
    let indexOfClicked = activeGridItemsIndices.indexOf(index);
    activeGridItemsIndices.splice(indexOfClicked, 1);
}

export function removeGridItems() {
    for (let gridItem of document.querySelectorAll(".grid-item")) {
        gridItem.removeChild(gridItem.firstElementChild);
        gridItem.remove();
    }
}


