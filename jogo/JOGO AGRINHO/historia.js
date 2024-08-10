const text ="CONTEXTO: Olá, compadre. Como está? Essa mensagem é para lhe informar sobre a degradação de terras e rios da região, convido você a entrar na aventura contra a Poluição... O nosso maior inimigo! Junto com o seu saber tecnológico e cultural sobre o campo nós vamos combater esse mal. Passe pelo percurso de lixo, e com a sua capacidade acerte questões sobre o agronegócio e a tecnologia no campo. Por fim lute contra a Poluição, confio no seu potencial! As perguntas além de envolver questões da agricultura e pecuária atual, podem também ajudar a se ter mais conhecimento das áreas. Não tenha medo, confio na coragem que habita no seu interior, pois aqui no campo todos nós se ajudamos. Se for difícil, nosso lema é _Nada de mar que não podemo miorár_ . Te desejo boa sorte piá!!"

const typingTextElement = document.getElementById('typing-text');
const skipButton = document.getElementById('skip-button');
const startButton = document.getElementById('start-button');
let index = 0;
let typingInterval;

function typeText() {
    if (index < text.length) {
        typingTextElement.textContent += text.charAt(index);
        index++;
    } else {
        clearInterval(typingInterval);
        showStartButton();
    }
}

function skipTyping() {
    clearInterval(typingInterval);
    typingTextElement.textContent = text;
    showStartButton();
}

function showStartButton() {
    skipButton.style.display = 'none';
    startButton.style.display = 'block';
}

window.onload = () => {
    typingInterval = setInterval(typeText, 70); // Velocidade da digitação
};

skipButton.addEventListener('click', skipTyping);
