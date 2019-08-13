import React from 'react';
import './Square.css';
import { useSelector, useDispatch } from 'react-redux';
import { clicked } from '../actions'

function Square(props) {
    const piece = useSelector(state => state.pieces.pieces[props.index]);
    const pieceName = piece
        ? piece.name
        : '';

    const cssClass = (piece && piece.selected)
        ? "square selected"
        : "square";

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(clicked(props.index));
    }

    return (
        <button className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}


export default Square;
