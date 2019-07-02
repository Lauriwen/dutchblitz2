import {PERFORMED} from '../actionnames.js';
import {START} from '../actionnames.js';
import {ADD} from '../actionnames.js';
import {RESET_SELECT} from '../actionnames.js';
import {NEW_SELECT} from '../actionnames.js';
import {CAN_WIN} from '../actionnames.js';
import {REMOVE} from '../actionnames.js';
import {PUT} from '../actionnames.js';
import {HAND} from '../actionnames.js';
import {PAUSE} from '../actionnames.js';
import {SELECT} from '../actionnames.js';



export function actionPerformed() {
    return {
        type : PERFORMED
    }

}

export function canWin(){
    return {
        type: CAN_WIN
    }
}

//returns 4 randomized decks
export function start(){
    const deck1 = buildDeck().sort(compare);
    const deck2 = buildDeck().sort(compare);
    const deck3 = buildDeck().sort(compare);
    const deck4 = buildDeck().sort(compare);
    return{
        type: START,
        deck1: deck1,
        deck2: deck2,
        deck3: deck3,
        deck4: deck4,
    }
}

//builds a new deck
function buildDeck(){
    let deck = [];
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 11; j++) {
            deck.push({color: translateColor(i), number: j, sortNumber: Math.random()})
        }
    }
    return deck;
}


//to sort the cards by increasing sort number values
function compare( a, b ) {
    if ( a.sortNumber < b.sortNumber ){
        return -1;
    }
    if ( a.sortNumber > b.sortNumber ){
        return 1;
    }
    return 0;
}


function translateColor(col) {
    switch (col) {
        case 1:
            return 'red';
        case 2:
            return 'yellow';
        case 3:
            return 'green';
        case 4:
            return 'blue';
        default:
            return '#d4d4d4';
    }

}

//to know which player has drawn, we just need the player number
export function takeHand(number) {
    console.log(number);
    return {
        type: HAND,
        player: number,
    }
}

export function newSelect(select){
    return {
        type: NEW_SELECT,
        isSelected: select
    }
}

//contains the pile, the player, the number on top of the pile (0 if it is empty) and the color of the card to store as selected card
export function removeCard(pile, player,topNumber, color){
    return({
        type: REMOVE,
        pile: pile,
        player: player,
        number :topNumber,
        color : color,
    })
}

//contains the pile, the player, the number on top of the pile (0 if it is empty) and the color of the card
export function putCard(pile, player,topNumber, color, card){
    return({
        type: PUT,
        pile: pile,
        player: player,
        number :topNumber,
        color : color,
        card: card,
    })
}


//add a card on the table
export function addCard(pile,topNumber, color,card){
    return({
        type: ADD,
        pile: pile,
        number :topNumber,
        color : color,
        card: card,
    })
}

//contains the pile, the player, the number on top of the pile (0 if it is empty) and the color of the card
export function storeCard(pile, player,number, color){
    return({
        type: SELECT,
        pile: pile,
        player: player,
        number :number,
        color : color,
    })
}

export function resetSelect(){
    return {type:RESET_SELECT}
}

//to pause and resume : just need to know the type
export function stopResume(){
    return {type: PAUSE}
}


