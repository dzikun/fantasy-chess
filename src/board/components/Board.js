import React from 'react';
import './Board.css';
import Square from './Square';
import { useSelector } from 'react-redux';


function Board(props) {
    const config = useSelector(state => state.config);

    const renderSquare = (i) => {
        return (
            <Square
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    };

    let rows = [];
    let i = 0;
    for (let y = 0; y < config.height; y++) {
        let line = [];
        for(let x = 0; x < config.width; x++) {
            line.push(renderSquare(i++));
        }
        rows.push(<div key={y} className="board-row">{line}</div>);
    }

    return (
        <div>
            {rows}
        </div>
    );
}

export default Board;
