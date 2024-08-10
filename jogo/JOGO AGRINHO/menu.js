document.getElementById('play-button').addEventListener('click', function() {
  window.location.href = '1historia.html'; // Certifique-se de que este seja o caminho correto para o jogo do dinossauro
});

document.getElementById('credits-button').addEventListener('click', function() {
  document.getElementById('credits-container').style.display = 'block';
});

document.getElementById('close-credits').addEventListener('click', function() {
  document.getElementById('credits-container').style.display = 'none';
});
