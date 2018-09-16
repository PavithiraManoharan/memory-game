/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let openCards = [];
let closedCards = [];
let matchMoves = 0;
let matchedPairs = 0;
let starCount = 3;
let firstMove = true;
let timeElapsed = 0;

function prepareSymbols() {
    const cardSymbols = [
    'magnet', 'laptop', 'magic', 'music', 'trophy', 'asterisk', 'camera', 'child', 'heart', 'compass', 
    'bell', 'at', 'backward', 'beer', 'home', 'hotel', 'info', 'instagram', 'mixcloud', 'mobile', 'paw'];
    const shuffledCardSymbols = shuffle(cardSymbols);
    const takeEight = shuffledCardSymbols.slice(0,8);
    const fullSetSymbols = [...takeEight, ...takeEight];
    const readyToPlaySymbols = shuffle(fullSetSymbols);
    return readyToPlaySymbols;
}

function displayCardsOnGame(readyToPlaySymbols) {
    for(cardSymbol of readyToPlaySymbols) {
        const deck = document.getElementById('deck');
        const cardHTML = document.createElement('LI');
        cardHTML.className = `card`;
        cardHTML.innerHTML = `<i class="fa fa-${cardSymbol}"></i>`;
        deck.appendChild(cardHTML);
    }
}


function cardListener(e) {
    if(firstMove) {
        timerIntervalId = window.setInterval(displayTime, 1000);
        firstMove = false;
    }
    const card = e.target;
    openTheCard(card);
    if(openCards.length >= 2) {
        const ifMatched = checkMatch();
        updateMoves();
        updateStars();
        if(ifMatched) {
            for(openCard of openCards) {
                openCard.classList.remove('open','show');
                openCard.classList.add('match');
                openCard.removeEventListener('click',cardListener);
            }
            matchedPairs++;
            if (matchedPairs === 8) {
                if(timerIntervalId) {
                    window.clearInterval(timerIntervalId);
                }
                declareWin();
            }
        }
        closeAllOpenCards();
    }
}

function displayTime() {
    timeElapsed++;
    const time = document.querySelector('.time');
    time.innerText = getFormattedTime(Number(timeElapsed));
}

function getFormattedTime(timeInSeconds) {
    if(timeInSeconds < 10) {
        return `0:0${timeInSeconds}`;
    } else if (timeInSeconds >= 60) {
        const quotient = Math.floor(timeInSeconds / 60);
        let remainder = (timeInSeconds % 60);
        remainder = (remainder < 10) ? `0${remainder}` : remainder;
        return `${quotient}:${remainder}`;
    } else {
        return `0:${timeInSeconds}`;
    }
}

function declareWin() {
    const successModal = document.querySelector('#successModal .modal-body');
    let winningTime = `${timeElapsed} seconds`;
    if(timeElapsed >= 60) {
        const quotient = Math.floor(timeElapsed / 60);
        const remainder = (timeElapsed % 60);
        let minutesText = (quotient === 1) ? 'minute' : 'minutes';
        let secondsText = (remainder === 1) ? 'second' : 'seconds';
        winningTime = `${quotient} ${minutesText} and ${remainder} ${secondsText}`;  
    }
    const starsText = starCount === 1 ? 'star' : 'stars';
    successModal.innerHTML = `
    <p>Congratulations! You won!</p>
    <p>You had a total of ${matchMoves} moves.</p>
    <p>You finished the game in ${winningTime} with ${starCount} ${starsText}! </p>
    `;
    $('#successModal').modal();
}

function resetGame() {
    window.clearInterval(timerIntervalId);
    const deck = document.getElementById('deck');
    while(deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    const stars = document.querySelector('.stars');
    while(stars.firstChild) {
        stars.removeChild(stars.firstChild);
    }
    initGame();
}

function updateMoves() {
    matchMoves++;
    const movesDisplay = document.querySelector('.moves');
    movesDisplay.innerText = matchMoves;
    document.querySelector('.movesText').innerText = (matchMoves === 1) ? 'Move' : 'Moves';
}

function updateStars() {
    const star = document.querySelector('.stars').lastElementChild;
    if (matchMoves === 15 || matchMoves === 25) {
        star.remove();
        starCount--;
    }
}

function displayStars(count) {
    const stars = document.querySelector('.stars');
    for(let i = 0; i < count; i++) {
        let listElement = document.createElement('LI');
        stars.appendChild(listElement);
        let iElement = document.createElement('I');
        iElement.classList.add('fa', 'fa-star');
        listElement.appendChild(iElement);
    }
}

function checkMatch() {
    let symbolsGiven = [];
    for(card of openCards) {
        const cardSymbolElement = card.querySelector('.fa');
        const cardSymbolElementClassname = cardSymbolElement.classList;
        const classNameArray = cardSymbolElementClassname.values();
        for(sClassName of classNameArray) {
            if(sClassName !== 'fa')
            symbolsGiven.push(sClassName);
        }
    }
    return (symbolsGiven[0] === symbolsGiven[1]) ? true : false;
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

function initGame() {
    openCards = [];
    closedCards = [];
    matchMoves = 0;
    matchedPairs = 0;
    starCount = 3;
    firstMove = true;
    timeElapsed = 0;
    displayStars(starCount);
    const gameSymbols = prepareSymbols();
    displayCardsOnGame(gameSymbols);
    document.querySelector('.moves').innerText = '0';
    document.querySelector('.movesText').innerText = 'Moves';
    document.querySelector('.time').innerText = '0:00';
    const cards = document.querySelectorAll('.card');
    for(let card of cards) {
        card.addEventListener('click',cardListener);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    initGame();
    const restartGameSelectors = document.querySelectorAll('.restart');
    for (selector of restartGameSelectors) {
        selector.addEventListener('click',resetGame);
    }
});