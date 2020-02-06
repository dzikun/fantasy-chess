import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { move, selectionStart, selectionEnd } from '../actions'
import Piece from './Piece'

function Square(props) {
    const piece = useSelector(state => state.pieces.pieces[props.index]);
    const pieceComponent = piece
        ? (<Piece piece={piece} index={props.index} point={props.point}/>)
        : null;

    const dispatch = useDispatch()

    const disableEvent = (e) => {
        e.shiftKey = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            dispatch(selectionStart(props.index, props.point));
        } else if (e.button === 2) {
            dispatch(move(props.index, props.point));
        }
        return disableEvent(e);
    }

    const handleMouseUp = (e) => {
        if (e.button === 0) {
            dispatch(selectionEnd(props.index, props.point, e.shiftKey, e.ctrlKey, e.altKey));
        }
        return disableEvent(e);
    }

    return (
        <div className="square"
                onContextMenu={disableEvent} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}>
            {pieceComponent}
        </div>
    );
}

export default Square;
