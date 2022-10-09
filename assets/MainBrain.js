const cardHandler = {
    displayQuestion: '',
    hasChoosen: false,
    gameStarted: false,
};

const flipContainer = document.querySelector('.flip-container .flipper').click(function() {
    $(this).closest('.flip-container').toggleClass('hover');
    $(this).css('transform, rotateY(180deg)');
  });