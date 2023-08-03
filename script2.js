'use strict';

var tinderContainer = document.querySelector('.tinder');
var cardsContainer = document.querySelector('.tinder--cards')
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var cardlength = 5
var cardCount = 5
var currentIndex = 0;
const imgpath = './img/'
const imgarray = ['DitzE', 'Barron', 'Beanie', 'Kym', 'Star', 'Skylocke', 
                  'Deca', 'Pratreo', 'DejaWukong', 'Milkie', 'HeroAges', 'Chim', 
                  'ChristFire', 'TripleJ', 'Scenecade', 'Skatey', 'Cocoa', 'Sol', 
                  'Witchy', 'Sunji', 'Crowz', 'Nemu', 'Woney', 
                  'Butler', 'Sylvie', 'Dragonspit', 'MIntchi', 'Jane', 'Mono', 
                  'Veta', 'Zalion', 'Deadman', 'Endo', 'ChaosLily', 'Gemini', 
                  'Mora', 'Kaia', 'Quattro', 'Xikesh', 'Ravenna', 'Kaze', 'Canaria', 
                  'Goronyanya', 'Kayda', 'Oathborne', 'Macchi', 'Mable', 'Aldini', 
                  'Riri', 'Musashi', 'Xantherous', 'Draggon', 'Tigra', 'Apolloka', 'Saejima']
imgarray.sort()
let imgcopy = [... imgarray]


function cycleCardImage(card) {
    // Get the current card image index
    var currentImgIndex = parseInt(card.dataset.imgIndex);
  
    // Increment the image index or reset it to 0 if it reaches the end
    currentImgIndex = (currentImgIndex + 1) % imgarray.length;
  
    // Update the card's image and data-img-index attribute
    card.querySelector('img').src = `${imgpath}${imgarray[currentImgIndex]}_1.jpg`;
    card.dataset.imgIndex = currentImgIndex;
  }
  

function createCard(cardData, zIndex) {
    const card = document.createElement('div');
    card.classList.add('tinder--card');
    card.style.zIndex = zIndex;
    card.innerHTML = `
      <img src="img/${cardData}_1.jpg">
      <h3>${cardData}</h3>
      <p>This is a demo for Tinder-like swipe cards</p>
    `;
    card.style.zIndex = allCards.length - zIndex;
    card.style.transform = 'scale(' + (20 - zIndex) / 20 + ') translateY(-' + 30 * zIndex + 'px)';
    card.style.opacity = (10 - zIndex) / 10;

    card.addEventListener('click', function (event) {
        cycleCardImage(card);
        event.stopPropagation(); // Prevent the click event from propagating to parent elements
      });

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
        var threshold = 10; // Set the threshold in pixels to trigger swipe left or right
    
        var keep = Math.abs(event.deltaX) < threshold || Math.abs(event.velocityX) < 0.1;
    
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
    
          // Call the button functions directly based on swipe direction
          if (event.deltaX > 0) {
            loveListener(event); // Pass the event parameter to loveListener
          } else {
            nopeListener(event); // Pass the event parameter to nopeListener
          }
        }
      });
    
      return card;
    }


  function initCards() {
    let cardImg = imgcopy[currentIndex];
    let cardno = Math.min(cardCount, imgcopy.length - currentIndex);
    
    for (let i = 0; i < cardno; i++) {
        if(currentIndex < imgcopy.length){
            var newCard = createCard(cardImg, i);
            cardsContainer.appendChild(newCard);
            cardImg = imgcopy[currentIndex + i + 1];
        }
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
  
      moveCard(card, love);
  
      currentIndex++;
      console.log(currentIndex);
      initCards();
  
      event.preventDefault();
    };
  }
  
initCards()
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
  
  nope.addEventListener('click', function(event) {
    createButtonListener(false)(event); // Pass 'false' for nope and the event parameter
  });
  
  love.addEventListener('click', function(event) {
    createButtonListener(true)(event); // Pass 'true' for love and the event parameter
  });