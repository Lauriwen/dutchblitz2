import {START} from '../actionnames.js';
import {ADD} from '../actionnames.js';

export default function dutchPilesReducer(state=initialStateDutchPiles,action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case ADD:
            addCard(newState, action);
            break;
        case START:
            newTable(newState);
            break;
        default:
    }

    return newState;
}

const initialStateDutchPiles = { dutchPiles : []};

function addCard(newState, action){

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((element) => {
        if (action.pile===element) {
            newState.dutchPiles[element].unshift(action.card)

        }
        return null


    });

    return newState;

}

function newTable(newState){
    newState.dutchPiles=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    return newState;
}