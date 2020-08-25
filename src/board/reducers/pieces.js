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
            const { source, destination } = action.payload;
            return {
                ...state,
                pieces: move(state.pieces, source, destination)
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

function move(pieces, source, destination) {
    const result = [...pieces];
    const sourceIndex = result.findIndex(p => p.point.x === source.x && p.point.y === source.y);
    if (isDestinationValid(pieces, destination)) {
        result[sourceIndex] = {...pieces[sourceIndex], point: destination}
    }
    return result;
}

function isDestinationValid(pieces, destination) {
    return true;
    //return !pieces.some(p => p.point.x === destination.x && p.point.y === destination.y);
}

function selectBox(pieces, start, end, shiftKey) {
    if (start == null) {
        return pieces;
    }
    if (shiftKey) {
        return pieces.map(p => {
            return p && isPointInBox(p.point, start, end)
                ? { ...p, selected: !p.selected }
                : p;
        });
    } else {
        return pieces.map(p => {
            return p
                ? { ...p, selected: isPointInBox(p.point, start, end) }
                : p;
        });
    }
}

function isPointInBox(point, start, end) {
    return ((start.x <= point.x && point.x <= end.x) || (end.x <= point.x && point.x <= start.x))
        && ((start.y <= point.y && point.y <= end.y) || (end.y <= point.y && point.y <= start.y));
}