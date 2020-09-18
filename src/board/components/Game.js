import React, { useEffect } from 'react';
import './Game.css';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { init, place } from '../actions';
import Piece from './Piece';
import { getFloatyPieces } from '../selectors';

function Game(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(init(8, 8));
        dispatch(place(1, {x: 1, y: 1}));
        dispatch(place(2, {x: 1, y: 2}));
        dispatch(place(3, {x: 1, y: 3}));
    }, [dispatch]);

    const floatyPieces = useSelector(getFloatyPieces)

    return (
        <div className="game">
            <div className="game-board">
                <Board />
                {floatyPieces.map(p => {
                    return (<Piece key={p.id} piece={p} />);
                })}
            </div>
        </div>
    );
}

export default Game;