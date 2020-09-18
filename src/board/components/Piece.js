import React, { useRef } from 'react';
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

    const ref = useRef();


    console.log(ref);
    if (ref.current) {
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        el.style.position = "absolute";
        el.style.left = rect.left + 100 + "px";
        el.style.top = rect.top + 100 + "px";
    }

    return (
        <button ref={ref} key={piece.id} className={cssClass} onClick={handleClick}>
            {pieceName}
        </button>
    );
}

export default Piece;
