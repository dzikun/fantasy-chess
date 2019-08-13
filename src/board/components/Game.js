import React from 'react';
import './Game.css';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { move, jumpTo, clicked } from '../actions';

function Game(props) {
    const game = useSelector(state => state.game);
    const current = game.history[game.stepNumber];

    let status;
    if (current.winner) {
        status = "Winner: " + current.winner;
    } else {
        status = "Next player: " + (game.xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
            </div>
        </div>
    );
}

export default Game;