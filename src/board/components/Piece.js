import React from 'react';
import './Piece.css';
import { useDispatch } from 'react-redux';
import { selected } from '../actions'

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
        dispatch(selected(props.index));
    }

    return (
        <button className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}


export default Piece;
