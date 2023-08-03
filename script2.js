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
                  'TripleJ', 'Scenecade', 'Skatey', 'Cocoa', 'Sol', 
                  'Witchy', 'Sunji', 'Crowz', 'Nemu', 'Woney', 
                  'Butler', 'Sylvie', 'Dragonspit', 'MIntchi', 'Jane', 'Mono', 
                  'Veta', 'Zalion', 'Deadman', 'Endo', 'ChaosLily', 'Gemini', 
                  'Mora', 'Kaia', 'Quattro', 'Xikesh', 'Ravenna', 'Kaze', 'Canaria', 
                  'Goronyanya', 'Kayda', 'Oathborne', 'Macchi', 'Mable', 'Aldini', 
                  'Riri', 'Musashi', 'Xantherous', 'Draggon', 'Tigra', 'Apolloka', 'Saejima', 'Lunae', 'SunWon', 
                  'Fionn', 'Matcha', 'AlexTGTV']
var imgdict = {'Aldini': 3, 'Apolloka': 3, 'Barron': 3, 'Beanie': 4, 'Butler': 4, 'Canaria': 1, 'ChaosLily': 4, 
'Chim': 4, 'Cocoa': 1, 'Crowz': 1, 'Deadman': 3, 'Deca': 3, 'DejaWukong': 4, 'DitzE': 2, 'Draggon': 2, 
'Dragonspit': 3, 'Endo': 3, 'Gemini': 3, 'Goronyanya': 1, 'HeroAges': 4, 'Jane': 2, 'Kaia': 4, 'Kayda': 4, 'Kaze': 1, 
'Kym': 1, 'Lunae': 2, 'Mable': 1, 'Macchi': 3, 'Milkie': 4, 'MIntchi': 1, 'Mono': 2, 'Mora': 4, 'Musashi': 1, 'Nemu': 2, 
'Oathborne': 1, 'Pratreo': 4, 'Quattro': 2, 'Ravenna': 3, 'Riri': 1, 'Saejima': 3, 'Scenecade': 2, 'Skatey': 1, 'Skylocke': 1, 
'Sol': 3, 'Star': 1, 'Sunji': 2, 'SunWon': 2, 'Sylvie': 4, 'Tigra': 2, 'Triplej': 2, 'Veta': 4, 'Witchy': 3, 'Woney': 2, 
'Xantherous': 3, 'Xikesh': 3, 'Zalion': 4, 'Fionn' : 4, 'Matcha' : 1, 'AlexTGTV' : 4}
var profileDict = {'Aldini': `Hyellor Hyellor! Im a High-elf/vampy nb who owns a library in a Lavender Field ✨ I give good Hugs!`, 
'Apolloka': `UwU`, 
'Barron': `Hello prototype I’m king barron I’m a half lion half human warrior trying to build his own kingdom and be king`, 
'Beanie': `Hi hi I'm beanie(she/her) just a shy little teddy bear`, 
'Butler': `Sure thing here! I’m a tiefling butler with an obsession with brownies and also I’m from another reality! the artists are @/khitar_  @/YoshinoArt`, 
'Canaria': `Please be gentle 😌 (don’t be) I’m you’re totally family friendly lewdsome succubus <3`, 
'ChaosLily': `Hi hi am Aoi also known as Lily >.< I am a Sorcerer who rules over a kingdom and I am known to cause chaos anywhere I go.`, 
'Chim': `Demon Wolf pup here to protect🐺🌸`, 
'Cocoa': `hello, I'm Cocoa! ☕️♥`, 
'Crowz': `Hello, Creatures Of The Night`, 
'Deadman': `Good day, I am Deadman, Changeling, Denizen of The Underworld, Master of Sin, at your service~
I am a British Variety VTuber who plays all genres of games, is trying to get into voice acting, and loves anime, manga, light novels and fantasy novels 🖤`, 
'Deca': `My time has come...
 I am Deca! A Wolfboy Time Spirit (Lore wip lmao) from Spain that loves to play videogames!`, 
 'DejaWukong': `🐒`, 
 'DitzE': `👀`, 'Draggon': ``, 
'Dragonspit': `Hello!

I'm an elf that was cursed with Dragon traits. I was once a dragon knight! Nice to meet you! 💙`, 
'Endo': `Heaven won’t ever be this devilish 😈`, 
'Gemini': `Hey there, I'm a Cosmic fox who likes to get into all sorts of mischief`, 
'Goronyanya': `Call me Goro, an Izakaya owning Samurai Vtuber`, 
'HeroAges': `I am Pink~ Therefore I do not think~`, 
'Jane': `--- 🍷 Vampire VStreamer & Aspiring Voice Actor 🎙️ ---`, 
'Kaia': `I swear if this is happens the way I think...Anyways-

I'm your Favorite Portal Hopping Immortal Traveler of all Known and Unknown~ I can show you the world shining, shimmering, splendid ❤️💛`, 
'Kayda': `Casted out from the heavens above, I'm Kayda`, 
'Kaze': `Hey!

Nice to meet ya! I am a Vtubing Dragon from another world with a focus on Niche Games but hopes to branch out to variety one day!`, 
'Kym': `Shapeshifting viking god at your service!`, 
'Lunae': `I hope I am not too late! I am Lunae the Moon Deity!`, 'Mable': "Hi~! I’m Mable the tactical sea otter.", 
'Macchi': `How do you feel about big girls? Cause I’m a 360 ft tall kaiju lady 😘`, 
'Milkie': "Omg I can't wait, this is going to be so fun! You're going to absolutely knock it out of the park!", 
'MIntchi': `👉👈💚`, 
'Mono': `Homies know how to have fun on the beach together >:3c`, 
'Mora': `Well, why not? I'm currently 0-1 against @gg_minji, and I wanna change that we are just two people up to no good. Best way, I can describe it we are twitch streamers that play val but like to be very competitive while playing coop games so let's see how it goes can I tie minji?`, 
'Musashi': `I'm Mu I'm an Isekai'd Bunny that's a detective and using streaming as a way to get info on the case! What's that case that's for yall to find out`, 
'Nemu': `I'm Mizuki Nemu! Your sleep paralysis, here to entertain you not torment you~! 
I'll say im a chaotic goofy boy despite being eepy almost all the time! ⛧
Good luck on partner pushh!!`, 
'Oathborne': `hello! my name is Reyes Oathborne the modern day knight reporting for duty`, 
'Pratreo': `Hello Cyborg,
I'm the Transformistress Vtuber, Eotidiss. A shapeshifter from another dimension that loves to play games for my pets. I have 6 forms, but I'll let you feast on my dragon form for now. Tell me what you think.💋💜`, 
'Quattro': `Heyo I’m a former human detective turned demon and I like to cause a bit of chaos`, 
'Ravenna': `Hello!! My name is Ravenna! Im a CatBat ( half Vampire bat, half cat girl). I own a bakery in a neon cyberpunk city, where I bake by day. And at night I am an assassin. The bakery I own doubles as a safe zone for all assassins and people of that trade to relax without worry`, 
'Riri': `Hello~ thank you for the opportunity! 💗
I'm RiriZaurahel, half elf half demon~ a queen that's in search of snacks ❤️`, 
'Saejima': `I'm just a lil guy that loves a good time!`, 
'Scenecade': `a silly pink dino basically 🦕🦖`, 
'Skatey': `Hi! I'm your local punk raccoon girl. Very sweet but with an edge and a little bit of chaos. Gamer and musician (well trying to be). Just here for a good time 💜💚💜💚💜💚`, 
'Skylocke': `Oh well this looks fun! I hope you enjoy a look into this hell hound himbo~ i love to sing and play table top games! But i love to share my voice even more.`, 
'Sol': `Hi there! Sol here~

Guardian Guild leader and Big Brother to most! Chinchilla enthusiasts with a knack for T/SRPG games. 

𝑊𝑜𝑢𝑙𝑑 𝑦𝑜𝑢 𝑙𝑖𝑘𝑒 𝑚𝑒 𝑡𝑜 𝑝𝑟𝑜𝑡𝑒𝑐𝑡 𝑎𝑛𝑑 𝑡𝑟𝑒𝑎𝑠𝑢𝑟𝑒 𝑦𝑜𝑢 𝑡𝑜𝑜?`, 
'Star': `not that hot but ok`, 
'Sunji': "Ahh fuck it yknow don’t break my heart to hard :')", 
'Sylvie': `Ahoy to all gals, pals, and yall! I'm Sylvie the Sea Witch, a variety vtuber hailing from the deep seas 🌊 I'm ready to be judged 💕`, 
'Tigra': `Hello and how do you do? My name is Tigra Valentine. I am a Vampire Goddess Tigress that love to play a variety of games. ^w^`, 
'Triplej': `Hey, my name's Triple J. The D.N.A. vtuber. Just your average genetic hybrid made with different genetic materials to obey my creators but I said 'nah' and now I stream and goof off`, 
'Veta': `I’m a Yeti who provides shelter to travelers who get lost in the deep snowy mountain. In my spare time I play Video games and take care of my Yeti son (see image)`, 
'Witchy': `Well hello there!~ I’m witchy tea cup. You can call my Tea. I love meeting knew sacrifices- I mean familiars and I can’t wait to meet all of you~`, 
'Woney': `Used to be a witch’s familiar, now I’m a human ❤️`, 
'Xantherous':`Hi, I'm Xantherous, a VTuber with 15 costumes. I play mostly simulations or chill indie games.`, 
'Xikesh': "Smash or pass? 👀 I look forward to what you have to say about my design/model", 
'Zalion': `Greetings my name is Zalion Eclipse I am a Dhampir.
(Lore)
I recently recovered from a curse that caused amnesia
(Streaming related)
I just returned from my year hiatus!`, 
'SunWon': `A Solar King searching for more loyal subjects 🌞✌️  Here to brighten your day!`, 
'Fionn' : `🍀🔒 I'm ready to guide your spirit to the afterlife ~
Right after I nom on that baguette :3`, 
'Matcha' : `Hiiii I'm Matcha a kitsune sorceress nice to meet you!`, 
'AlexTGTV' : `Hello my name AlexTGTV, am a Vampire/Demon who fight and survive over 400 years with a ocean of bloods`}


imgarray.sort()
let imgcopy = [... imgarray]


function cycleCardImage(card) {
    var cardName = card.querySelector('h3').innerText;
    var currentImgIndex = parseInt(card.dataset.imgIndex || 1); // Use 0 as default if the attribute is not set
  
    // Get the number of images associated with the card name from imgdict
    var numImages = imgdict[cardName] || 1;
  
    // Increment the image index or reset it to 0 if it reaches the end
    currentImgIndex = (currentImgIndex % numImages) + 1;
  
    // Update the card's image and data-img-index attribute
    card.querySelector('img').src = `${imgpath}${cardName}_${currentImgIndex}.jpg`;
    card.dataset.imgIndex = currentImgIndex;
  }
  

function createCard(cardData, zIndex) {
    const card = document.createElement('div');
    card.classList.add('tinder--card');
    card.style.zIndex = zIndex;
    card.innerHTML = `
      <img src="img/${cardData}_1.jpg">
      <h3>${cardData}</h3>
      <p>${profileDict[cardData]}</p>
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
        }else{
            //display no more cards left here?
        }
    }
    console.log(currentIndex)
    console.log(imgcopy.length)
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
      //console.log(currentIndex);
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