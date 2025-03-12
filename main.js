const animals = [
    'perro',
    'gato',
    'loro',
    'elefante',
    'jirafa',
    'león',
    'tigre',
    'oso',
    'mono',
    'conejo',
    'perro',
    'gato',
    'loro',
    'elefante',
    'jirafa',
    'león',
    'tigre',
    'oso',
    'mono',
    'conejo'
  ];
  
  const board = document.querySelector('.board');
  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createBoard() {
    const shuffledAnimals = shuffle(animals);
    for (let i = 0; i < shuffledAnimals.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = '?';
  
      const back = document.createElement('div');
      back.classList.add('back');
      back.textContent = shuffledAnimals[i];
  
      card.appendChild(front);
      card.appendChild(back);
      board.appendChild(card);
      card.addEventListener('click', flipCard);
    }
  }
  
  function flipCard() {
    const cardId = this.getAttribute('data-id');
    // Verificar si la tarjeta ya está volteada o si ya ha sido encontrada
    if (this.classList.contains('flip') || cardsWon.includes(animals[cardId])) {
      return;
    }
    this.classList.add('flip');
    cardsChosen.push(animals[cardId]);
    cardsChosenIds.push(cardId);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  
  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      alert('¡Encontraste un par!');
      cards[optionOneId].classList.add('hidden');
      cards[optionTwoId].classList.add('hidden');
      cardsWon.push(cardsChosen[0]);
    } else {
      cards[optionOneId].classList.remove('flip');
      cards[optionTwoId].classList.remove('flip');
      alert('Lo siento, intenta de nuevo');
    }
    cardsChosen = [];
    cardsChosenIds = [];
    if (cardsWon.length === animals.length / 2) {
      alert('¡Felicidades! Encontraste todos los pares');
    }
  }
  
  createBoard();