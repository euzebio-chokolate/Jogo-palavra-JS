const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');

let currentRow = 0;
let currentCol = 0;
let currentWordLength = 5;

function createGameBoard(wordLength) {
    currentWordLength = wordLength;
    gameBoard.innerHTML = '';

    for (let i = 0; i < wordLength; i++) {
        const row = document.createElement('div');
        row.classList.add('board-row');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('div');
            cell.classList.add('board-cell');
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
    gameBoard.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;
}

createGameBoard(5); // Funcionando