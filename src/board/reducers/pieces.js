import _ from 'lodash';

import { CLICKED } from "../actions";

const initialState = {
    selected: [],
    pieces: [{ name: 'P', selected: false },
    { name: 'K', selected: false },
    { name: 'P', selected: false }]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLICKED: {
            const { index } = action.payload;
            let pieces = state.pieces;
            let piece = pieces[index];
            if (piece) {
                pieces = toggleSelect(pieces, index);
            } else {
                pieces = moveSelected(pieces, index);
            }
            return {
                ...state,
                pieces: pieces
            }
        }
        default:
            return state;
    }

}

function toggleSelect(pieces, index) {
    const result = [...pieces];
    result[index] = {
        ...result[index],
        selected: !result[index].selected
    }
    return result;
}

function moveSelected(pieces, index) {
    const result = [...pieces];
    let moved = 0;
    pieces
        .forEach((p, i) => {
            if (p && p.selected) {
                result.splice(i, 1, null);
                result[index + (moved++)] = p;
            }
        });

    return result;
}