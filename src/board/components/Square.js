import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { clicked } from '../actions'
import Piece from './Piece'

function Square(props) {
    const piece = useSelector(state => state.pieces.pieces[props.index]);
    const pieceComponent = piece
        ? (<Piece piece={piece} index={props.index}/>)
        : null;

    const dispatch = useDispatch()
    const handleRightClick = (e) => {
        e.preventDefault();
        dispatch(clicked(props.index));
        return false;
    }

    return (
        <div className="square" onContextMenu={handleRightClick}>
            {pieceComponent}
        </div>
    );
}


export default Square;
