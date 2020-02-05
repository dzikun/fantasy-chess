import { CLICKED, SELECTED } from "../actions";

const initialState = () => {
    return {
        selected: [],
        pieces: [{ name: 'P', selected: false },
        { name: 'K', selected: false },
        { name: 'P', selected: false }]
    };
}

export default function (state = initialState(), action) {
    switch (action.type) {
        case SELECTED: {
            const { index } = action.payload;
            const pieces = toggleSelect(state.pieces, index);
            return {
                ...state,
                pieces: pieces
            }
        }
        case CLICKED: {
            const { index } = action.payload;
            const pieces = moveSelected(state.pieces, index);
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
        ...pieces[index],
        selected: !pieces[index].selected
    }
    return result;
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