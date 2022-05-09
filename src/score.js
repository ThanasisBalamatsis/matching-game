export let currentPlayerIndex = 0;
export let scores = [0, 0];

export function increaseScore() {
    scores[currentPlayerIndex]++;
}

export function decreaseScore() {
    scores[currentPlayerIndex]--;
}

export function changeCurrentPlayerIndex() {
    (currentPlayerIndex === 0) ? currentPlayerIndex = 1 : currentPlayerIndex = 0;
}

export function resetScore() {
    scores = [0, 0];
}