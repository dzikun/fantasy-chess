import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { gameSaga } from './sagas/game.saga';
import { composeWithDevTools } from 'redux-devtools-extension';


import './index.css';
import Game from './components/Game';
import rootReducer from './reducers'

function renderBoard(element) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(rootReducer, 
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        ))

    sagaMiddleware.run(gameSaga)

    ReactDOM.render(
        <Provider store={store}>
            <Game />
        </Provider>,
        element
    )
}

export default renderBoard;

