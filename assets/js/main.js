async function testeAPI(palavra) {
    const input = document.getElementById("teste");
    if(await checkWordExists(palavra)) {
        console.log("Palavra Existe");
    } else {
        console.log("Palavra não existe!");
    }
}
//evento que simula o teclado fisico ao teclado vitual
document.addEventListener('keydown', (event) => {
    simulateKeyPressVisual(event.key);
});

const palavraCorreta = 'passe';

function verificarTentativa(palavra) {
    const letrasCorretas = palavraCorreta.split('');
    const tentativa = palavra.split('');
    const cells = document.querySelectorAll(`.board-cell[row="${currentRow}"]`);

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
}

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const palavra = getCurrentWord();

        if (palavra.length < 5) {
            document.getElementById('message-area').textContent = "Preencha todas as letras!";
            return;
        }

        const valida = await checkWordExists(palavra);

        if (!valida) {
            document.getElementById('message-area').textContent = `"${palavra.toUpperCase()}" não é uma palavra válida!`;
            return;
        }

        document.getElementById('message-area').textContent = "";

        verificarTentativa(palavra); // Pinta as letras corretas

        if (currentRow < maxAttempts - 1) {
            currentRow++;
            const nextCell = document.querySelector(`.board-cell[row="${currentRow}"][col="0"]`);
            if (nextCell) nextCell.focus();
        } else {
            document.getElementById('message-area').textContent = "Fim de jogo!";
        }
    }
});
