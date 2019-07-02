import {START} from '../actionnames.js';
import {PERFORMED} from '../actionnames.js';

//to know how many moves have been performed
export default function performedReducer(state=initialStateIsSelected, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case PERFORMED:
            newState.performed ++;
            return newState;
        case START:
            newState.performed =0;
            return newState;
        default:
            return newState;
    }

}
const initialStateIsSelected = { performed : 0};