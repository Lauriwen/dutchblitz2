import {PAUSE} from '../actionnames.js';

export default function playingReducer(state=initialStatePlaying, action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case PAUSE:
            newState.playing=!newState.playing;
            return newState
        default:
            return newState;
    }
}


const initialStatePlaying = { playing : false};