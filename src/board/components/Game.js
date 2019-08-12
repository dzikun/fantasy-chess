import React from 'react';
import './Game.css';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { move, jumpTo } from '../actions';

function Game(props) {
    const dispatch = useDispatch();
    const handleClick = (i) => {
        return dispatch(move(i));
    }

    const handleJumpTo = (step) => {
        return dispatch(jumpTo(step));
    }

    const history = useSelector(state => state.history);
    const stepNumber = useSelector(state => state.stepNumber);
    const current = history[stepNumber];
    const winner = useSelector(state => state.winner);
    const xIsNext = useSelector(state => state.xIsNext);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => handleJumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;