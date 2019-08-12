import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from "redux";


import './index.css';
import Game from './components/Game';
import rootReducer from './reducers'

function renderBoard(element) {
    const store = createStore(rootReducer)

    ReactDOM.render(
        <Provider store={store}>
            <Game />
        </Provider>,
        element
    )
}

export default renderBoard;

