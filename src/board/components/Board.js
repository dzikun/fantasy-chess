import React from 'react';
import './Board.css';
import Square from './Square';
import { useSelector } from 'react-redux';
import Point from '../model/Point'

function Board(props) {
    const config = useSelector(state => state.map.config);

    const renderSquare = (index, point) => {
        return (
            <Square
                key={index}
                index={index}
                point={point}
            />
        );
    };

    let rows = [];
    let i = 0;
    for (let y = 0; y < config.height; y++) {
        let line = [];
        for(let x = 0; x < config.width; x++) {
            const point = new Point(x, y);
            line.push(renderSquare(i++, point));
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
