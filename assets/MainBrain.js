const questions = [
  "",
  "",
  "",
  
]

const cardHandler = {
    displayQuestion: '',
    hasChoosen: false,
    gameStarted: false,
};

const cards = document.querySelectorAll('.card');
[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
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

function loadQuestions (){
  if(cardHandler.gameStarted == true)
    return;
  cardHandler.gameStarted = true;
  
}

btn_startGame.addEventListener('click', startGame);

