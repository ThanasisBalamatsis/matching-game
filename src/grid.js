import { runGameLogic } from "./logic.js";

export const numberGridItems = 9;
const gridContainer = document.getElementById("grid-container");
const images = ["blue", "blue", "pink", "pink", "turquoise", "turquoise", "purple", "purple", "hole"];
let gridItemsIndices = [];
export let activeGridItemsIndices = [];


export function createGrid(numberGridItems) {

    createIndicesArrays(numberGridItems);
    shuffleGridItemsIndicesArray(gridItemsIndices);

    for (let i = 0; i < numberGridItems; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.id = `grid-item-${i}`;
        const image = createImage(i);
        gridItem.appendChild(image);
        gridItem.addEventListener("click", function() {
            
            gridItem.firstChild.classList.remove("hidden");
            runGameLogic(i, image);
                     
        });
        gridContainer.appendChild(gridItem);
    }
}

function createImage(index) {
    const image = document.createElement("img");
    image.classList.add("img");
    image.classList.add("hidden");
    image.src = `/images/${images[gridItemsIndices[index]]}.jpg`;
    return image;
}

function createIndicesArrays(numberGridItems) {
    for (let i = 0; i < numberGridItems; i++) {
        gridItemsIndices[i] = i;
        activeGridItemsIndices[i] = i;
    }
}

function shuffleGridItemsIndicesArray(gridItemsIndices) {
    let currentIndex = gridItemsIndices.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [gridItemsIndices[currentIndex], gridItemsIndices[randomIndex]] = [gridItemsIndices[randomIndex], gridItemsIndices[currentIndex]];
    }
}




