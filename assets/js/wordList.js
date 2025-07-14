const wordList = {
    cinco: [
        "cabra", "festa", "nuvem", "fonte", "fruta",
        "livro", "brisa", "canto", "feira", "piano",
        "claro", "verde", "fossa", "folha", "campo"
    ],
    seis: [
        "banana", "cavalo", "filtro", "caderno", "sabido",
        "navios", "amendo", "moreno", "fusora", "cheiro",
        "amável", "lavour", "sombra", "frango", "bichos"
    ],
    sete: [
        "tesoura", "florido", "domingo", "revolta", "garrafa",
        "sincero", "trabalho", "meninas", "espelho", "desenho",
        "amassar", "sistema", "convers", "mistura", "vitória"
    ]
};

export function pegarPalavraAleatoria(numLetras) {
    let chaveCategoria;
    switch (numLetras) {
        case 5:
            chaveCategoria = 'cinco';
            break;
        case 6:
            chaveCategoria = 'seis';
            break;
        case 7:
            chaveCategoria = 'sete';
            break;
        default:
            console.warn(`Número de letras (${numLetras}) não suportado.`);
            return null; 
    }

    const palavrasDaCategoria = wordList[chaveCategoria];

    // Verifica se a categoria existe e tem palavras
    if (!palavrasDaCategoria || palavrasDaCategoria.length === 0) {
        console.warn(`Não há palavras na categoria '${chaveCategoria}'.`);
        return null;
    }

    // Gera um índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * palavrasDaCategoria.length);

    // Retorna a palavra aleatória
    return palavrasDaCategoria[indiceAleatorio];
}