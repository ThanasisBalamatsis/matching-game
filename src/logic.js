import {activeGridItemsIndices, createGrid, numberGridItems} from "./grid.js"
import {increaseScore, decreaseScore, changeCurrentPlayerIndex} from "./score.js"
import {displayScores, displayMessage, displayCurrentPlayer} from "./message.js"

let lastTwoClickedIndices = [];

export function runGameLogic(index, image) {

    addToLastTwoClickedIndices(index);

    if (image.src.includes("hole")) {
        makeGridItemsUnclickable();
        removeLastClickedFromActiveGridIndices(index);
        decreaseScore();
        changeCurrentPlayerIndex();
        displayScores();
        displayMessage("Oops! Penalty!");
        setTimeout(function() {
            hideImages();
            lastTwoClickedIndices = [];
            makeGridItemsClickable();
            displayCurrentPlayer();
            displayMessage("Ready to play!");
            if (activeGridItemsIndices.length === 0 ) {
                removeGridItems();
                createGrid(numberGridItems);
            }
        }, 3500);

    }
    else if (lastTwoClickedIndices.length === 2) {
        
        if (checkIfThereIsMatching()) {
            makeGridItemsUnclickable();
            removeLastTwoClickedFromActiveGridIndices();
            increaseScore();
            changeCurrentPlayerIndex();
            displayScores();
            displayMessage("Nice!They match!");
            setTimeout(function() {
                lastTwoClickedIndices = [];
                makeGridItemsClickable();
                displayCurrentPlayer();
                displayMessage("Ready to play!");
                if (activeGridItemsIndices.length === 0 ) {
                    removeGridItems();
                    createGrid(numberGridItems);
                }
            }, 3500);

        }
        else {
            makeGridItemsUnclickable();
            changeCurrentPlayerIndex();
            displayScores();
            displayMessage("They don't match!");
            setTimeout(function() {
                hideImages();
                lastTwoClickedIndices = [];
                makeGridItemsClickable();
                displayCurrentPlayer();
                displayMessage("Ready to play!");
                if (activeGridItemsIndices.length === 0 ) {
                    removeGridItems();
                    createGrid(numberGridItems);
                }
            }, 3500);
        }
    }
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


