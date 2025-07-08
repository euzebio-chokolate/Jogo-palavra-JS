async function checkWordExists(word) {
    word = word.toLowerCase();
    try {
        const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
        if (!response.ok) {
            if (response.status === 404) {
                return false;
            }
            throw new Error(`Erro na API: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.length > 0);
        return data.length > 0;
    } catch (error) {
        console.error("Erro ao verificar palavra na API:", error);
        return false;
    }
}
