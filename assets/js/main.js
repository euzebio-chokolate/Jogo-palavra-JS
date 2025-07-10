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