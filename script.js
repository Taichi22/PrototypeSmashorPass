'use strict';

var tinderContainer = document.querySelector('.tinder');
var cardsContainer = document.querySelector('.tinder--cards')
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var cardlength = 5
var cardcount = 5
const imgpath = './img/'
const imgarray = ['DitzE', 'Barron', 'Beanie', 'Kym', 'Star', 'Skylocke', 
                  'Deca', 'Pratreo', 'DejaWukong', 'Milkie', 'HeroAges', 'Chim', 
                  'ChristFire', 'TripleJ', 'Scenecade', 'Skatey', 'Cocoa', 'Sol', 
                  'Witchy', 'Sunji', 'Crowz', 'Nemu', 'Woney', 
                  'Butler', 'Sylvie', 'Dragonspit', 'mlntchi', 'Jane', 'Mono', 
                  'Veta', 'Zalion', 'Deadman', 'Endo', 'ChaosLily', 'Gemini', 
                  'Mora', 'Kaia', 'Quattro', 'Xikesh', 'Ravenna', 'Kaze', 'Canaria', 
                  'Goronyanya', 'Kayda', 'Oathborne', 'Macchi', 'Marble', 'Aldini', 
                  'Riri', 'Mushashi', 'Xantherous', 'Draggon', 'Tigra', 'Apolloka', 'Saejima']

imgarray.sort()
allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createCard(cardData, zIndex) {
  const card = document.createElement('div');
  card.classList.add('tinder--card');
  card.style.zIndex = zIndex;
  card.innerHTML = `
    <img src="img/${cardData}_1.jpg">
    <h3>${cardData}</h3>
    <p>This is a demo for Tinder-like swipe cards</p>
  `;
  var hammertime = new Hammer(card);

  hammertime.on('pan', function (event) {
    card.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    card.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });

  return card;
}

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
  var oldCards = document.querySelectorAll('.removed');
  let cardImg = imgarray.shift()
  let imgcopy = [... imgarray]
  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
    console.log(cardImg)
    card.innerHTML = `<img src="img/`+ cardImg +`_1.jpg" class="profile">
    <h3>`+ cardImg + `</h3>
    <p>This is a demo for Tinder like swipe cards</p>`
    cardImg = imgcopy.shift()
  });
  console.log(newCards.length);
  if(newCards.length < cardlength && imgcopy.length > 0){
    //generate new cards
    var newCard = createCard(cardImg + '', 5)
    cardsContainer.appendChild(newCard)
  }

  tinderContainer.classList.add('loaded');
}
initCards();

function updateCards(card, index){
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
  var oldCards = document.querySelectorAll('.removed');
  let cardImg = imgarray.shift()
  let imgcopy = [... imgarray]
  if(newCards.length < cardlength && imgcopy.length > 0){
    //generate new cards
    var newCard = createCard(cardImg + '', 5)
    cardsContainer.appendChild(newCard)
  }
  tinderContainer.classList.add('loaded');
}

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    moveCard(card, love)

    initCards();

    event.preventDefault();
  };
}
function moveCard(card, love){
  var moveOutWidth = document.body.clientWidth * 1.5;
  if (love) {
    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
  } else {
    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
  }
  return 0;
}
var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
