export const MOVE = "MOVE";
export const SELECTION_START = "SELECTION_START";
export const SELECTION_END = "SELECTION_END";
export const TOUCH = "TOUCH";


export const move = (index, point) => {
    return {
        type: MOVE,
        payload: { index, point }
    }
}

export const selectionStart = (index, point) => {
    return {
        type: SELECTION_START,
        payload: { index, point }
    }
}

export const selectionEnd = (index, point, shiftKey, ctrlKey, altKey) => {
    return {
        type: SELECTION_END,
        payload: { index, point, shiftKey, ctrlKey, altKey}
    }
}

export const touch = (index, point) => {
    return {
        type: TOUCH,
        payload: { index, point }
    }
}