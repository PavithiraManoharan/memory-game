/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function prepareSymbols() {
    const cardSymbols = [
    "magnet", "laptop", "magic", "music", "trophy", "asterisk", "camera", "child", "heart", "compass", "bell", "at", "backward", "beer", "home", "hotel", "info", "instagram", "mixcloud", "mobile", "paw"];
    const shuffledCardSymbols = shuffle(cardSymbols);
    const takeEight = shuffledCardSymbols.slice(0,8);
    const fullSetSymbols = [...takeEight, ...takeEight];
    const readyToPlaySymbols = shuffle(fullSetSymbols);
    return readyToPlaySymbols;
}

function displayCardsOnGame(readyToPlaySymbols) {
    for(cardSymbol of readyToPlaySymbols) {
        const deck = document.getElementById('deck');
        const cardHTML = document.createElement("LI");
        cardHTML.className = `card`;
        cardHTML.innerHTML = `<i class="fa fa-${cardSymbol}"></i>`;
        deck.appendChild(cardHTML);
    }
}

let openCards = [];
let closedCards = [];
let matchMoves = 0;

function cardListener(e) {
    const card = e.target;
    openTheCard(card);
    if(openCards.length >= 2) {
        const ifMatched = checkMatch();
        updateMoves();
        updateStars();
        if(ifMatched) {
            for(openCard of openCards) {
                openCard.classList.remove("open","show");
                openCard.classList.add("match");
                openCard.removeEventListener('click',cardListener);
            }
        }
        closeAllOpenCards();
    }
}
function updateMoves() {
    matchMoves++;
    const movesDisplay = document.querySelector('.moves');
    movesDisplay.innerText = matchMoves;
}

function updateStars() {
    const star = document.querySelector('.stars').lastElementChild;
    if (matchMoves === 15 || matchMoves === 25) {
        star.remove();
    }
}

function checkMatch() {
    let symbolsGiven = [];
    for(card of openCards) {
        const cardSymbolElement = card.querySelector('.fa');
        const cardSymbolElementClassname = cardSymbolElement.classList;
        const classNameArray = cardSymbolElementClassname.values();
        for(sClassName of classNameArray) {
            if(sClassName !== "fa")
            symbolsGiven.push(sClassName);
        }
    }
    if(symbolsGiven[0] === symbolsGiven[1]) {
        return true;
    } else {
        return false;
    }
}

function openTheCard(card) {
    if(openCards.length < 2 && !(card.classList.contains('match') || card.classList.contains('fa') || card.classList.contains('open'))) {
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
    }, 400);
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

document.addEventListener('DOMContentLoaded', function(){
    const gameSymbols = prepareSymbols();
    displayCardsOnGame(gameSymbols);
    const cards = document.querySelectorAll('.card');
    for(let card of cards) {
        card.addEventListener('click',cardListener);
    }
});

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