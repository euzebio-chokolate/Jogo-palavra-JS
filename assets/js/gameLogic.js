import * as api from './api.js';
import { showModal } from './main.js';
import { updateStats } from './stats.js';
import * as ui from './ui.js';
import { pegarPalavraAleatoria } from './wordList.js';

const palavraCorreta = pegarPalavraAleatoria(5);
console.log(palavraCorreta)
let venceu = false;

function verificarTentativa(palavra) {
    const letrasCorretas = palavraCorreta.split('');
    const tentativa = palavra.split('');
    const cells = document.querySelectorAll(`.board-cell[row="${ui.currentRow}"]`);

    const status = Array(palavra.length).fill('incorreta');

    for (let i = 0; i < palavra.length; i++) {
        if (tentativa[i] === letrasCorretas[i]) {
            status[i] = 'correta';
            letrasCorretas[i] = null;
        }
    }

    for (let i = 0; i < palavra.length; i++) {
        if (status[i] === 'correta') continue;
        const index = letrasCorretas.indexOf(tentativa[i]);
        if (index !== -1) {
            status[i] = 'lugarErrado';
            letrasCorretas[index] = null;
        }
    }

    for (let i = 0; i < cells.length; i++) {
        if (status[i] === 'correta') {
            cells[i].style.backgroundColor = '#6aaa64';
        } else if (status[i] === 'lugarErrado') {
            cells[i].style.backgroundColor = '#c9b458';
        } else {
            cells[i].style.backgroundColor = '#787c7e';
        }
    }
    
    venceu = status.every((letra) => letra === 'correta');
}

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const palavra = ui.getCurrentWord();

        if (palavra.length < 5) {
            document.getElementById('message-area').textContent = "Preencha todas as letras!";
            return;
        }

        const valida = await api.checkWordExists(palavra);

        if (!valida) {
            const popup = document.getElementById('errorPopup');
            popup.classList.remove('hidden');
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
                popup.classList.add('hidden');
            }, 1500); 
            return;
        }

        verificarTentativa(palavra);

        if ((ui.currentRow < ui.maxAttempts - 1) && !venceu) {
            ui.incrementCurrentRow()
            const nextCell = document.querySelector(`.board-cell[row="${ui.currentRow}"][col="0"]`);
            if (nextCell) nextCell.focus();
        } else {
            updateStats(venceu, ui.currentRow + 1);
            showModal();
        }
    }
});