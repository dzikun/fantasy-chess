import { SELECTION_START, SELECTION_END, MOVE, TOUCH } from "../actions";
import Point from '../model/Point'

const initialState = () => {
    return {
        pieces: [
            { name: 'P', selected: false, point: {x: 0, y: 0} },
            { name: 'K', selected: false, point: {x: 1, y: 0} },
            { name: 'P', selected: false, point: {x: 2, y: 0} }],
        selectionStart: null
    };
}

export default function (state = initialState(), action) {
    switch (action.type) {
        case MOVE: {
            const { index } = action.payload;
            return {
                ...state,
                pieces: moveSelected(state.pieces, index)
            }
        }
        case SELECTION_START: {
            const { point } = action.payload;
            return {
                ...state,
                selectionStart: point
            }
        }
        case SELECTION_END: {
            const { point, shiftKey } = action.payload;
            return {
                ...state,
                selectionStart: null,
                pieces: selectBox(state.pieces, state.selectionStart, point, shiftKey)
            }
        }
        default:
            return state;
    }

}

function moveSelected(pieces, index) {
    const result = [...pieces];

    pieces
        .forEach((p, i) => {
            if (p && p.selected) {
                let target = index;
                while (result[target] && i !== target) {
                    target++;
                }
                result.splice(i, 1, null);
                result[target] = p;
            }
        });

    return result;
}

function selectBox(pieces, start, end, shiftKey) {
    if (start == null) {
        return pieces;
    }
    if (shiftKey) {
        return pieces.map((p, i) => {
            const point = calculatePointFromIndex(i);
            return p && isPointInBox(point, start, end)
                ? { ...p, selected: !p.selected }
                : p;
        });
    } else {
        return pieces.map((p, i) => {
            const point = calculatePointFromIndex(i);
            return p
                ? { ...p, selected: isPointInBox(point, start, end) }
                : p;
        });
    }
}

function isPointInBox(point, start, end) {
    return ((start.x <= point.x && point.x <= end.x) || (end.x <= point.x && point.x <= start.x))
        && ((start.y <= point.y && point.y <= end.y) || (end.y <= point.y && point.y <= start.y));
}

function calculatePointFromIndex(index) {
    return new Point(index % 8, Math.floor(index / 8));
}