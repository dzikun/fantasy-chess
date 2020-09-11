import { Map, Set } from 'immutable';
import { RESERVE, MOVE, SELECTION_START, SELECTION_END, INIT, PLACE } from '../actions'

const initialState = () => {
    return {
        config: { 
            width: 0,
            height: 0
        },
        board: Map(),
        pieces: Map() 
            .set(1, { id: 1, name: 'A', selected: false })
            .set(2, { id: 2, name: 'B', selected: false })
            .set(3, { id: 3, name: 'C', selected: false }),

        selectionStart: null,
        selected: Set()
    }
}

export default function (state = initialState(), action) {
    switch (action.type) {
        case INIT: {
            let board = state.board;
            for(let x = 0; x < action.payload.width; x++) {
                for(let y = 0; y < action.payload.height; y++) {
                    const point = {x, y};
                    const key = toString(point);
                    board = board.set(key, { point, reserved: undefined, occupied: undefined})
                }
            }
            return {...state, config: action.payload, board};
        }
        case PLACE: {
            let board = state.board
            const destKey = toString(action.payload.dest)
            const destSquare = board.get(destKey)
            if (!destSquare.occupied) {
                board = board.set(destKey, { ...destSquare, reserved: null, occupied: action.payload.id })
                return { ...state, board }
            } else {
                return state;
            }
        }
        case RESERVE: {
            let board = state.board
            const destKey = toString(action.payload.dest)
            const destSquare = board.get(destKey)
            if (!destSquare.reserved) {
                board = board.set(destKey, { ...destSquare, reserved: action.payload.id })
                return { ...state, board }
            } else {
                return state;
            }
        }
        case MOVE: {
            let board = state.board
            const srcKey = toString(action.payload.src)
            const destKey = toString(action.payload.dest)
            const destSquare = board.get(destKey)
            if (!destSquare.occupied && destSquare.reserved === action.payload.id) {
                board = board.set(destKey, { ...destSquare, reserved: null, occupied: action.payload.id });
                if (srcKey) {
                    board = board.set(srcKey, { ...board.get(srcKey), occupied: null });
                }
                return { ...state, board }
            } else {
                return state;
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
                selected: selectBox(state.board, state.selected, state.selectionStart, point, shiftKey)
            }
        }
        default:
            return state;
    }
}


function selectBox(board, selected, start, end, shiftKey) {
    if (!start || !end) {
        return selected;
    }
    if (!shiftKey) {
        selected = selected.clear();
    }
    board.filter(v => v.occupied && isPointInBox(v.point, start, end))
        .forEach(v => {
            if (shiftKey && selected.contains(v.occupied)) {
                selected = selected.remove(v.occupied);
            } else {
                selected = selected.add(v.occupied)
            }
        });
    return selected;
}

function isPointInBox(point, start, end) {
    return ((start.x <= point.x && point.x <= end.x) || (end.x <= point.x && point.x <= start.x))
        && ((start.y <= point.y && point.y <= end.y) || (end.y <= point.y && point.y <= start.y));
}

function toString(point) {
    if (!point) {
        return null;
    }
    return point.x + "," + point.y;
}
