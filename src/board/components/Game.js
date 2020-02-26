import React from 'react';
import './Game.css';
import Board from './Board';

function Game(props) {

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

export default Game;