import {PUT} from '../actionnames.js';
import {REMOVE} from '../actionnames.js';
import {START} from '../actionnames.js';
import {HAND} from '../actionnames.js';
import {CAN_WIN} from '../actionnames.js';

//names of the different players
const player1='Yoenn';
const player2='Thomas';
const player3='Fares';
const player4='Louis';


export default function playerDataReducer(state=initialStatePlayerData, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case PUT:
            addCard(newState,action);
            break;
        case REMOVE:
            removeCard(newState,action);
            break;
        case START:
            newBoards(newState,action);
            break;
        case HAND:
            draw(newState,action);
            break;
        case CAN_WIN:
            hasWon(newState.playerData);
            break;
        default:

    }



    return newState;
}

const initialStatePlayerData = {
    playerData: {//all player data

        player1Data: { // all the player piles

            name : player1,

            blitzPile: [],

            leftPostPile: [],

            middlePostPile: [],

            rightPostPile: [],

            woodPile: [],

            hand: [],

        },

        player2Data: {

            name : player2,


            blitzPile: [],

            leftPostPile: [],

            middlePostPile: [],

            rightPostPile: [],

            woodPile: [],

            hand: [],

        },

        player3Data: {

            name : player3,

            blitzPile: [],

            leftPostPile: [],

            middlePostPile: [],

            rightPostPile: [],

            woodPile: [],

            hand: [],

        },

        player4Data: {

            name : player4,

            blitzPile: [],

            leftPostPile: [],

            middlePostPile: [],

            rightPostPile: [],

            woodPile: [],

            hand: [],

        },

        winner: {
            exist: false,

            list: [[1,0, player1],[2,0, player2],[3,0,player3],[4,0,player4]]
        }
    }};


//determines if there is a winner and, if it is the case, who it is.
function hasWon(playerData){
    if(winnerExist(playerData)) { //check if there is a winner and if aq least 10 cards have been moved in order not to trigger when the game is not initialized(he blitz pile is a this time empty)
        let a=[[1,0, playerData.player1Data.name],[2,0, playerData.player2Data.name],[3,0, playerData.player3Data.name],[4,0, playerData.player4Data.name]];
        for (let i = 1; i < 5; i++) {
            a[i-1][1]=count(playerData,i)
        }
        //classify the table of player according to their results
        a.sort(compare);

        playerData.winner.exist=true;
        playerData.winner.list=a;
    }
}

//determines if someone emptied his blitz pile
function winnerExist(playerData){
    for(let i=1; i<5; i++){
        if(playerData[`player${i}Data`].blitzPile.length===0){
            return true
        }
    }
    return false
}

//calculates the score of a given player
function count(playerData, i){
    const cards = playerData[`player${i}Data`];
    return  40-cards.hand.length-cards.leftPostPile.length-cards.middlePostPile.length-cards.rightPostPile.length-3*cards.blitzPile.length-cards.woodPile.length;

}

//to classify the players by decreasing number of points
function compare( a, b ) {
    if ( a[1] > b[1] ){
        return -1;
    }
    else {
        return 1;
    }

}




//gives 3 new cards to a given player
function draw(newState, action){
    const element=action.player;
    console.log(newState);
    console.log(action.player);
    let board=newState.playerData[`player${element}Data`];
    //
    if(!board.hand || !board.hand[0]){ //if there is no remaining card in the and pile
        board.hand = board.woodPile.reverse(); //flip it
        board.woodPile=[]
    }
    let i=0;
    while(board && board.hand[0] && i<3){ //while there is still a card in the hand pile
        let a= board.hand.shift();
        board.woodPile.unshift(a);
        i++
    }
    newState.playerData[`player${element}Data`]=board;
    return newState;
}

//adds the stored card
function addCard(newState, action){

    switch (action.pile) {  //depending on the suited destination, we perform different moves
        case 'leftPostPile':
            newState.playerData[`player${action.player}Data`].leftPostPile.unshift(action.card);
            break;
        case 'middlePostPile':
            newState.playerData[`player${action.player}Data`].middlePostPile.unshift(action.card);
            break;
        case 'rightPostPile':
            newState.playerData[`player${action.player}Data`].rightPostPile.unshift(action.card);
            break;
        default:
    }
    return newState;
}

//removes the stored card
function removeCard(newState,action){
    switch(action.pile) {
        case 'leftPostPile':
            newState.playerData[`player${action.player}Data`].leftPostPile.shift();
            break;
        case 'middlePostPile':
            newState.playerData[`player${action.player}Data`].middlePostPile.shift();
            break;
        case 'rightPostPile':
            newState.playerData[`player${action.player}Data`].rightPostPile.shift();
            break;
        case 'blitzPile':
            newState.playerData[`player${action.player}Data`].blitzPile.shift();
            break;
        case 'woodPile':
            newState.playerData[`player${action.player}Data`].woodPile.shift();
            break;
        default:
    }
    return newState;
}

function newBoards(newState, action){

    //initialize each player's deck
    newState.playerData.player1Data.leftPostPile=[action.deck1.shift()];
    newState.playerData.player1Data.middlePostPile=[action.deck1.shift()];
    newState.playerData.player1Data.rightPostPile=[action.deck1.shift()];
    newState.playerData.player1Data.blitzPile=action.deck1.slice(0,10);
    newState.playerData.player1Data.hand=action.deck1.slice(10,38);
    newState.playerData.player1Data.woodPile = [];

    newState.playerData.player2Data.leftPostPile=[action.deck2.shift()];
    newState.playerData.player2Data.middlePostPile=[action.deck2.shift()];
    newState.playerData.player2Data.rightPostPile=[action.deck2.shift()];
    newState.playerData.player2Data.blitzPile=action.deck2.slice(0,10);
    newState.playerData.player2Data.hand=action.deck2.slice(10,38);
    newState.playerData.player2Data.woodPile = [];

    newState.playerData.player3Data.leftPostPile=[action.deck3.shift()];
    newState.playerData.player3Data.middlePostPile=[action.deck3.shift()];
    newState.playerData.player3Data.rightPostPile=[action.deck3.shift()];
    newState.playerData.player3Data.blitzPile=action.deck3.slice(0,10);
    newState.playerData.player3Data.hand=action.deck3.slice(10,38);
    newState.playerData.player3Data.woodPile = [];

    newState.playerData.player4Data.leftPostPile=[action.deck4.shift()];
    newState.playerData.player4Data.middlePostPile=[action.deck4.shift()];
    newState.playerData.player4Data.rightPostPile=[action.deck4.shift()];
    newState.playerData.player4Data.blitzPile=action.deck4.slice(0,10);
    newState.playerData.player4Data.hand=action.deck4.slice(10,38);
    newState.playerData.player4Data.woodPile = [];

    //delete the previous winner list
    newState.playerData.winner.exist=false;
    newState.playerData.winner.list=[[1,0],[2,0],[3,0],[4,0]];



    return newState;
}







