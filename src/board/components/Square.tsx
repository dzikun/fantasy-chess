import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { commandMoveSelected, selectionStart, selectionEnd } from '../actions'
import Piece from './Piece'

function Square(props) {
    //const piece = useSelector(state => state.pieces.pieces.find(p => props.point.x === p.point.x && props.point.y === p.point.y));
    const squareKey = props.point.x + "," + props.point.y;
    const square = useSelector(state => state.map.board.get(squareKey));
    let piece = useSelector(state => square && square.occupied ?
        state.map.pieces.get(square.occupied)
        : null);
    if (piece && piece.floaty) {
        piece = null;
    }
    const pieceComponent = piece
        ? (<Piece piece={piece} point={props.point} />)
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
            dispatch(selectionStart(props.point));
        } else if (e.button === 2) {
            dispatch(commandMoveSelected(props.point));
        }
        return disableEvent(e);
    }

    const handleMouseUp = (e) => {
        if (e.button === 0) {
            dispatch(selectionEnd(props.point, e.shiftKey, e.ctrlKey, e.altKey));
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
