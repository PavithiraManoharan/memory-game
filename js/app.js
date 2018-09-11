/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardSymbols = [
"magnet", "laptop", "magic", "music", "trophy", "asterisk", "camera", "child", "heart", "compass", "bell", "at", "backward", "beer", "home", "hotel", "info", "instagram", "mixcloud", "mobile", "paw"];
const shuffledCardSymbols = shuffle(cardSymbols);
const takeEight = shuffledCardSymbols.slice(0,8);
const fullSetSymbols = [...takeEight, ...takeEight];
const readyToPlaySymbols = shuffle(fullSetSymbols);

for(cardSymbol of readyToPlaySymbols) {
    //Add fa- to each string and create a card HTML Element, add it to the ul in HTML
    const deck = document.getElementById('deck');
    const cardHTML = document.createElement("LI");
    cardHTML.className = `card`;
    cardHTML.innerHTML = `<i class="fa fa-${cardSymbol}"></i>`;
    deck.appendChild(cardHTML);
}
/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');
let openCards = [];
let closedCards = [];

for(let card of cards) {
    card.addEventListener('click',cardListener);
}

function cardListener(e) {
    
    const card = e.target;
    openTheCard(card);
    if(openCards.length >= 2) {
        closeAllOpenCards();
    }
}

function openTheCard(card) {
    if(openCards.length < 2 && !(card.classList.contains('match') || card.classList.contains('fa'))) {
        card.classList.add('open','show');
        addToOpenCards(card);
    }
}

function closeAllOpenCards() {
    setTimeout(function() {
        for(let openCard of openCards) {
            openCard.classList.remove('open','show');
        }
        openCards = [];
    }, 1000);
}

function addToOpenCards(card) {
    openCards.push(card);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
