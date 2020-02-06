import { SELECTION_START, SELECTION_END, MOVE, TOUCH } from "../actions";

const initialState = () => {
    return {
        pieces: [
            { name: 'P', selected: false },
            { name: 'K', selected: false },
            { name: 'P', selected: false }],
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
            const { index } = action.payload;
            return {
                ...state,
                selectionStart: index
            }
        }
        case SELECTION_END: {
            const { index } = action.payload;
            return {
                ...state,
                selectionStart: null,
                pieces: selectBox(state.pieces, state.selectionStart, index)
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

function selectBox(pieces, start, end) {
    if (start == null) {
        return pieces;
    }
    return pieces.map((p, i) => {
        return p
            ? { ...p, selected: ((start <= i && i <= end) || (end <= i && i <= start)) }
            : p;
    });
}