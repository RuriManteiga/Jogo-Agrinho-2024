// Definição das perguntas e respostas
const questions = [
  {
    question: "Qual desses animais é criado para a produção de leite?",
    correctAnswer: "Vaca",
    answers: ["Porco", "Galinha", "Vaca", "Dragão de komodo"]
  },
  {
    question: "Dentre as culturas abaixo, qual a principal cultura produzida pela agricultura familiar no Brasil?",
    correctAnswer: "Café",
    answers: ["Café", "Feijão", "Arroz", "Pastel de Frango com catupiry"]
  },
  {
    question: "Dentre os animais abaixo, qual é utilizado para a produção de carne e de lã?",
    correctAnswer: "Ovelha",
    answers: ["Gato", "Macaco", "T-Rex", "Ovelha"]
  },
  {
    question: "O que são sensores de umidade do solo?",
    correctAnswer: "Dispositivos que medem a umidade do solo",
    answers: ["Dispositivos que medem a umidade do solo", "Dispositivos que produzem energia ", "Dispositivos que medem a temperatura do ar", "Dão comida para as plantas famintas :("]
  },
  {
    question: "Qual é o nome do sistema de cultivo que alterna diferentes culturas em uma mesma área ao longo do tempo?",
    correctAnswer: "Rotação de culturas",
    answers: ["Plantio direto", "(PAG) Plantio Alternado Agroflorestal", "Rotação de culturas", "Solstício de verão"]
  },
];

// Seletores de elementos
const pia = document.querySelector(".pia");
const lixo = document.querySelector(".lixo");
const boss = document.querySelector(".boss");
const scoreElement = document.querySelector(".score");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const gameOverContainer = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart");

// Variáveis do jogo
let alreadyJump = false;
let count = 0;
let gamePaused = false;
let intervalId;
let scoreThreshold = 1000;
let questionsAnswered = 0;
let remainingQuestions = [];
let isInvulnerable = false;
let spriteInterval;
let lixoSpriteInterval;

// Função para inicializar as perguntas
function initializeQuestions() {
  remainingQuestions = [...questions];
}

// Função do loop principal do jogo
function gameLoop() {
  let piaBottom = parseInt(window.getComputedStyle(pia).getPropertyValue("bottom"));
  let lixoLeft = parseInt(window.getComputedStyle(lixo).getPropertyValue("left"));

  if (lixoLeft > 40 && lixoLeft < 270 && piaBottom <= 50 && !alreadyJump) {
    if (!isInvulnerable) {
      handleGameOver();
    }
  }

  if (!gamePaused) {
    count++;
    scoreElement.innerHTML = `SCORE: ${count}`;
  }

  if (count >= scoreThreshold && !gamePaused) {
    stopGame();
  }
}

// Função de pular
function jump() {
  if (!pia.classList.contains("jump")) {
    pia.classList.add("jump");
    alreadyJump = true;
    setTimeout(() => {
      pia.classList.remove("jump");
      alreadyJump = false;
    }, 1100);
  }
}

// Função para lidar com o Game Over
function handleGameOver() {
  clearInterval(intervalId);
  clearInterval(spriteInterval);
  clearInterval(lixoSpriteInterval);
  gameOverContainer.style.display = 'block';
  finalScoreElement.textContent = count;
  pia.style.animationPlayState = 'paused';
  lixo.style.display = 'none';
}

// Função para parar o jogo e mostrar o boss
function stopGame() {
  clearInterval(intervalId);
  clearInterval(spriteInterval);
  clearInterval(lixoSpriteInterval);
  gamePaused = true;
  lixo.style.display = 'none';
  pia.style.animationPlayState = 'paused';
  showBoss();
}

// Função para iniciar o jogo
function startGame() {
  if (remainingQuestions.length === 0) {
    initializeQuestions();
  }
  intervalId = setInterval(gameLoop, 10);
  gamePaused = false;
  lixo.style.animationPlayState = 'running';
  lixo.style.display = 'block';
  lixo.style.right = '-80px'; // Ajusta a posição inicial do lixo
  questionContainer.style.display = 'none';
  gameOverContainer.style.display = 'none';
  
    // Iniciar a alternância dos sprites do lixo
    lixoSpriteInterval = setInterval(updateLixoSprite, 30); // Muda o sprite a cada segundo

  // Iniciar a alternância dos sprites do pia
  spriteInterval = setInterval(togglePiaSprite, 300); // Muda o sprite a cada segundo
}

// Função para mostrar o boss e a pergunta
function showBoss() {
  boss.style.display = 'block';
  clearInterval(intervalId);
  showQuestion();
}

// Função para mostrar a pergunta
function showQuestion() {
  if (remainingQuestions.length === 0) {
    initializeQuestions();
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const questionData = remainingQuestions[randomIndex];

  questionElement.textContent = questionData.question;
  answersElement.innerHTML = '';
  questionData.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer');
    button.addEventListener('click', () => checkAnswer(answer, questionData.correctAnswer, randomIndex));
    answersElement.appendChild(button);
  });

  questionContainer.style.display = 'block';
}

// Função para checar a resposta
function checkAnswer(selectedAnswer, correctAnswer, questionIndex) {
  if (selectedAnswer === correctAnswer) {
    remainingQuestions.splice(questionIndex, 1);
    questionsAnswered++;
    if (questionsAnswered >= 3) {
      questionsAnswered = 0;
      scoreThreshold += 1000;
      resetGameElements();
      startGame();
    } else {
      questionContainer.style.display = 'none';
      boss.style.display = 'none';
      showCorrectAnswerMessage(); // Mostra mensagem de acerto
      startGame();
    }
  } else {
    handleGameOver();
  }
}

// Função para mostrar mensagem de acerto
function showCorrectAnswerMessage() {
  const correctMessage = document.createElement('div');
  correctMessage.textContent = "ACERTO!";
  correctMessage.classList.add('correct-message');
  document.body.appendChild(correctMessage);
  setTimeout(() => {
    correctMessage.remove();
  }, 1000); // Remove a mensagem após 2 segundos
}

// Função para atualizar o sprite do lixo aleatoriamente
function updateLixoSprite() {
  const sprites = ['lixo-sprite1'];
  const randomSprite = sprites[Math.floor(Math.random() * sprites.length)];
  lixo.className = 'lixo ' + randomSprite;

    // Iniciar a alternância dos sprites do lixo
    lixoSpriteInterval = setInterval(updateLixoSprite, 3000); // Muda o sprite a cada segundo
  
}

// Função para alternar entre os sprites do pia
function togglePiaSprite() {
  if (pia.classList.contains('pia-sprite1')) {
    pia.classList.remove('pia-sprite1');
    pia.classList.add('pia-sprite2');
  } else if (pia.classList.contains('pia-sprite2')) {
    pia.classList.remove('pia-sprite2');
    pia.classList.add('pia-sprite3');
  } else if (pia.classList.contains('pia-sprite3')) {
    pia.classList.remove('pia-sprite3');
    pia.classList.add('pia-sprite4');
  } else {
    pia.classList.remove('pia-sprite4');
    pia.classList.add('pia-sprite1');
  }
}

// Função para redefinir os elementos do jogo
function resetGameElements() {
  boss.style.display = 'none';
  lixo.style.display = 'block';
  pia.style.animationPlayState = 'running';
}

// Configura o botão de reinício
restartButton.addEventListener('click', () => {
  location.reload(); // Recarrega a página
});

// Detecta a tecla de pular
document.addEventListener("keydown", (e) => {
  if ((e.code === "ArrowUp") || (e.code === "Space")) {
    jump();
  }
});

// Inicia o jogo
initializeQuestions();
startGame();
