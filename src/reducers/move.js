import {SELECT} from '../actionnames.js';
import {RESET_SELECT} from '../actionnames.js';

export default function moveReducer(state=initialStateMove, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case SELECT:
            newState.move= action;
            break;
        case RESET_SELECT:
            newState.move={};
            break;
        default :
            return newState
    }

    return newState;

}

const initialStateMove = { move : {}};

