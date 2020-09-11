import React from 'react';
import './Piece.css';
import { useDispatch, useSelector } from 'react-redux';
import { touch } from '../actions'

function Piece(props) {
    const piece = props.piece;
    const pieceName = piece
        ? piece.name
        : '';

    const selected = useSelector(state => state.map.selected.contains(piece.id));
    const cssClass = (piece && selected)
        ? "piece selected"
        : "piece";

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(touch(props.point));
    }

    return (
        <button key={piece.id} className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}

export default Piece;
