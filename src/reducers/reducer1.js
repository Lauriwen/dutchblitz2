import { combineReducers } from 'redux';
import playingReducer from './playing.js';
import isSelectedReducer from './isselected.js';
import moveReducer from './move.js';
import dutchPilesReducer from './dutchpiles.js';
import playerDataReducer from './playerdata.js'
import performedReducer from './performed.js';



export default combineReducers({
    playingReducer,
    isSelectedReducer,
    moveReducer,
    dutchPilesReducer,
    playerDataReducer,
    performedReducer,
});






