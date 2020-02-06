export const MOVE = "MOVE";
export const SELECTION_START = "SELECTION_START";
export const SELECTION_END = "SELECTION_END";
export const TOUCH = "TOUCH";


export const move = (index) => {
    return {
        type: MOVE,
        payload: { index }
    }
}

export const selectionStart = (index) => {
    return {
        type: SELECTION_START,
        payload: { index }
    }
}

export const selectionEnd = (index) => {
    return {
        type: SELECTION_END,
        payload: { index }
    }
}

export const touch = (index) => {
    return {
        type: TOUCH,
        payload: { index }
    }
}