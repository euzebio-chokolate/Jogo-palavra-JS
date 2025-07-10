const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');

let currentRow = 0;
let currentCol = 0; // A coluna atual na linha (0 a currentWordLength - 1)
let currentWordLength = 5;
const maxAttempts = 6;

function createGameBoard(wordLength) {
    currentWordLength = wordLength;
    gameBoard.innerHTML = '';

    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.classList.add('board-row');
        row.style.gridTemplateColumns = `repeat(${currentWordLength}, 1fr)`;

        for (let j = 0; j < currentWordLength; j++) {
            const cell = document.createElement('input');
            cell.classList.add('board-cell');
            cell.maxLength = 1;
            cell.setAttribute('row', i);
            cell.setAttribute('col', j);

            cell.addEventListener('keydown', function(event) {
                const row = parseInt(event.target.getAttribute('row'));
                const col = parseInt(event.target.getAttribute('col'));

                if (event.key.match(/^[a-zA-Z]$/) && col < currentWordLength - 1) {
                    setTimeout(() => { // Usar setTimeout garante que o valor seja atualizado antes de mover o foco
                        if (event.target.value) {
                             event.target.classList.add('filled-cell');
                        }
                        const nextCell = document.querySelector(`.board-cell[row="${row}"][col="${col + 1}"]`);
                        if (nextCell) {
                            nextCell.focus();
                        }
                    }, 0);
                }
                else if (event.key === 'Backspace') {
                    if (event.target.value) {
                        event.target.value = ''; 
                        event.target.classList.remove('filled-cell');
                    } else if (col > 0) {
                        const prevCell = document.querySelector(`.board-cell[row="${row}"][col="${col - 1}"]`);
                        if (prevCell) {
                            prevCell.focus();
                            prevCell.value = ''; // Apaga o conteúdo da célula anterior ao voltar para ela
                            prevCell.classList.remove('filled-cell');
                        }
                    }
                }
                else if (!event.key.match(/^[a-zA-Z]$/) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                    event.preventDefault();
                }
            });

            cell.addEventListener('input', function(event) {
                if (event.target.value.length > 1) {
                    event.target.value = event.target.value.slice(0, 1);
                }
                event.target.value = event.target.value.toUpperCase();

                if (event.target.value) {
                    event.target.classList.add('filled-cell');
                } else {
                    event.target.classList.remove('filled-cell');
                }
            });


            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}

createGameBoard(6);

document.addEventListener('DOMContentLoaded', () => {
    const firstCell = document.querySelector('.board-cell[row="0"][col="0"]');
    if (firstCell) {
        firstCell.focus();
    }
});