import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import NewGame from './components/newgame';
import Game from './components/game.js';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/reducer1.js';

const store=createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
    <div>
        <Game />
        <NewGame/>
    </div>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
