// Recuperar número do cartão do localStorage
const numberCard = localStorage.getItem('numberCard');

// Atualizar elementos HTML com o número do cartão
const zerosDiv = document.querySelector('.zeros');
zerosDiv.textContent = ''; // Limpar o conteúdo atual

for (let i = 0; i < 16; i++) {
  const span = document.createElement('span');
  span.textContent = numberCard.charAt(i);

  if (i !== 0 && i % 4 === 0) {
    const spaceSpan = document.createElement('span');
    spaceSpan.textContent = ' ';
    zerosDiv.appendChild(spaceSpan);
  }

  zerosDiv.appendChild(span);
}
const nameCard = localStorage.getItem('nameCard')

const dadosP = document.querySelector('.dados');
dadosP.textContent = nameCard.toUpperCase(); // Aqui você pode definir o valor desejado para o nome

const cvcCard = localStorage.getItem('cvcCard')
const dadosCvc = document.querySelector('.cardBack p')
dadosCvc.textContent = cvcCard.toUpperCase()

const mesCard = localStorage.getItem('mesCard')
const anoCard = localStorage.getItem('anoCard')
const zeros2P = document.querySelector('.zeros2');
zeros2P.textContent = `${mesCard}/${anoCard}`  // Aqui você pode definir o valor desejado para a data
