import React from 'react';
import './Piece.css';
import { useDispatch } from 'react-redux';
import { touch } from '../actions'

function Piece(props) {
    const piece = props.piece;
    const pieceName = piece
        ? piece.name
        : '';

    const cssClass = (piece && piece.selected)
        ? "piece selected"
        : "piece";

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(touch(props.index));
    }

    return (
        <button className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}


export default Piece;
