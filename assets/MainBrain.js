const questions = [
  "Sebutkan satu kegiatan favoritmu dengan aku?",
  "Apa salah satu rintangan yang pernah kamu hadapi dan bagaimana kamu menanganinya?",
  "Sebutkan salah satu hal yang sangat kamu khawatirkan, apakah aku bisa membantunya?",
  "Apakah ada guru yang mengubah hidupmu?",
  "Apa prioritas utamamu untuk sisa tahun ini?",
  "Kapan terakhir kali aku membuat kamu merasa hebat tentang dirimu dan bagaimana aku bisa melakukannya lebih sering?",
  "Apa yang paling kamu nantikan saat menjadi tua?",
  "Apa sesuatu yang kamu berusaha sangat keras menyukai tetapi tidak bisa?",
  "Apa hal yang paling kamu tidak sukai dari dirimu sendiri, apakah ingin mengubahnya?",
  "Sebutkan 3 hal yang kamu senang lakukan denganku?",
  "Apa penyesalan terbesar kamu, apakah kamu ingin mengubahnya?",
  "Apa yang kebanyakan orang melebih-lebihkan mengenai kamu?",
  "Apa pujian terbaik yang pernah kamu dapatkan?",
  "Apa ada hal yang kamu pernah lakukan, namun tidak akan pernah melakukanya lagi?",
  "Sebutkan kebodohan/kekonyolan yang paling berkesan saat kamu SD/SMP/SMA",
  "Apa cita-citamu 10 tahun yang lalu, apakah sudah tercapai?",
  "Apa saja yang membuat kamu gugup?",
  "Apakah kamu percaya bahwa setiap orang pantas mendapatkan kesempatan kedua?",
  "Apa saja hal yang membuat kamu bosen?",
  "Ceritakan salah satu fantasi yang kamu pernah pikirkan/harapkan"
]

const cardHandler = {
    displayCard1: '',
    displayCard2: '',
    gameState: 0, //0 = Not yet choosen card, 1 = chose card, 3 = loop back
};

const cards = document.querySelectorAll('.card');
[...cards].forEach((card, i)=>{
  card.addEventListener( 'click', function(event) {
    switch (cardHandler.gameState) {
      case 0:
        card.classList.toggle('is-flipped');
        cardChosen(i);
        break;
      case 1:
        nextCard(i);
        break;
      default:
        break;
    }
  });
});

const cardHolder = document.querySelector('.card-holder');
const btn_startGame = document.querySelector('#startButton');
const txt_countDown = document.querySelector('.countdown');

function startGame () {
  let counter = 3;
  btn_startGame.classList.toggle('turn-off');
  const startInterval = setInterval(() =>{
    if (counter == 0){
      txt_countDown.innerHTML = "Let's play, choose your card!";
      setTimeout(() =>{
        txt_countDown.innerHTML = "";
      }, 1000);
      setTimeout(() =>{
        cardHolder.classList.add('turn-on');
        loadQuestions();
      }, 3000);
      clearInterval(startInterval);
    } else{
      txt_countDown.innerHTML = counter;
      counter--;
    }
  }, 1000);
}

const cardBack1 = document.querySelector('#card_back_1');
const cardBack2 = document.querySelector('#card_back_2');
function loadQuestions (){
  let numQuestion1 = random(questions);
  cardHandler.displayCard1 = questions[numQuestion1];  
  cardBack1.innerHTML = cardHandler.displayCard1;
  
  
  if (questions.length == 1){
    return;
  }

  let numQuestion2 = random(questions);
  while (numQuestion1 == numQuestion2) {
    numQuestion2 = random(questions);
  }
  
  cardHandler.displayCard2 = questions[numQuestion2];  
  cardBack2.innerHTML = cardHandler.displayCard2;

}

function cardChosen(cardIndex){
  cardHandler.gameState = 1;
  if(questions.length > 1){
    buttonSwitcher(cardIndex);
  }
}

function nextCard(cardIndex){
  cards[cardIndex].classList.toggle('is-flipped');
  cardHandler.gameState = 2;
  if(cardIndex == 0){
    removeQuestion(questions, questions.indexOf(cardHandler.displayCard1));
  } else{
    removeQuestion(questions, questions.indexOf(cardHandler.displayCard2));
  }
  if(questions.length == 0){
    endgame();
    return;
  }

  setTimeout(() => {
    loadQuestions();
    cardHandler.gameState = 0;
    if(questions.length > 1){
      buttonSwitcher(cardIndex);
    } else if(questions.length == 1 && cardIndex == 1){
        buttonSwitcher(cardIndex);
        buttonSwitcher(0);
      }
  }, 1000);
}

function removeQuestion(arr, item) {
  arr.splice(item, 1);
}

function endgame(){
  cardHolder.classList.remove('turn-on');
  txt_countDown.innerHTML = "Thank you for playing!";
}

function buttonSwitcher(cardIndex){
  if(cardIndex == 0){
    cards[1].parentElement.classList.toggle('turn-off');
  }else{
    cards[0].parentElement.classList.toggle('turn-off');
  }
}

function random(cardArr){
  let number = Math.floor(Math.random() * cardArr.length);
  return number;
}

btn_startGame.addEventListener('click', startGame);