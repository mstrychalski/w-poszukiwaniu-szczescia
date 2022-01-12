const flipCards = $('.flip-card');
const cardsContainer = $('.cards-container');
let clicked = true;
let opacity = 95;
const inactiveTimeout = 2000;
const fadeOutSpeed = 15000;
const fadeInSpeed = 2000;
const shuffleDelay = 200;
let activityTimeout = setTimeout(inActive, inactiveTimeout);
let cardShuffled = 0;

function shuffleFinished() {
  return cardShuffled === 9;
}

function resetOpacity() {
  flipCards.stop();
  flipCards.fadeIn('slow');
}

function onCardClicked(e) {
  e.preventDefault();

  if (clicked || !shuffleFinished()) {
    return;
  }

  clicked = true;

  flipCards.removeClass('flip');
  $(this).addClass('flip');

  setTimeout(() => {
    $(this).removeClass('flip');
  }, 1000);

  setTimeout(() => {
    shuffle();
  }, 1400)
}

function resetActive(){
  if (!shuffleFinished()) {
    return;
  }

  clearTimeout(activityTimeout);
  activityTimeout = setTimeout(inActive, inactiveTimeout);

  resetOpacity();
}

function inActive(){
  if (!shuffleFinished()) {
    return;
  }

  flipCards.fadeOut(fadeOutSpeed, onFadeFinished);
}

function onFadeFinished() {
  cardsContainer.hide();
  $('.quote-wrapper').fadeIn(fadeInSpeed);
}

function shuffle() {
  clearTimeout(activityTimeout);

  const cardNumbers = shuffleArray([1,2,3,4,5,6,7,8,9]);

  console.log(cardNumbers);

  cardShuffled = 0;
  let positions = [];

  flipCards.stop( true, true );
  flipCards.addClass('shuffle');

  flipCards.each((function () {
    const widthCenter = ($(document).width() / 2) - ($(this).width() / 2);
    const top = ($(document).width() / 2) - ($(this).width() / 2);
    positions.push({
      left: -$(this).offset().left + widthCenter,
      top: -$(this).offset().top + ($(document).height() - ($(this).height() / 2))
    });
  }));

  flipCards.each((function (i) {
    const position = positions[i];

    $(this).animate(position);
    const cardNumber = cardNumbers[i];

    $(this).find('.flip-card-back img').attr('src', `img/card/card${cardNumber}.jpg`);
  }));

  flipCards.each((async function (i) {
    $(this).delay(shuffleDelay * i).animate({
      left: 0,
      top: 0
    }, () => {
      cardShuffled++;

      if (shuffleFinished()) {
        resetActive();
        clicked = false;
        flipCards.removeClass('shuffle');
      }
    });
  }));
}

function init() {
  $('.cards-wrapper').fadeIn(2000, () => {
    $('.card-center').addClass('flip');

    setTimeout(() => {
      $('.card-center').removeClass('flip');
    }, 2000);

    setTimeout(() => {
      shuffle();
    }, 2500);
  });
}

$(document).bind('mousemove', function(){resetActive()});
$(document).bind('click', function(){resetActive()});

flipCards.click(onCardClicked);

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

cardsContainer.width($(document).height());

init();
