import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { move, selectionStart, selectionEnd } from '../actions'
import Piece from './Piece'

function Square(props) {
    const piece = useSelector(state => state.pieces.pieces[props.index]);
    const pieceComponent = piece
        ? (<Piece piece={piece} index={props.index}/>)
        : null;

    const dispatch = useDispatch()

    const handleRightClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(move(props.index));
        return false;
    }

    const handleMouseDown = (e) => {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        dispatch(selectionStart(props.index));
    }

    const handleMouseUp = (e) => {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        dispatch(selectionEnd(props.index));
    }

    return (
        <div className="square"
                onContextMenu={handleRightClick} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
            {pieceComponent}
        </div>
    );
}


export default Square;
