import {NEW_SELECT} from '../actionnames.js';
import {RESET_SELECT} from '../actionnames.js';



export default function isSelectedReducer(state=initialStateIsSelected, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case NEW_SELECT:
            newState.isSelected = action.isSelected;
            return newState;
        case RESET_SELECT:
            newState.isSelected = false;
            return newState;
        default:
            return newState;
    }

}
const initialStateIsSelected = { isSelected : false};