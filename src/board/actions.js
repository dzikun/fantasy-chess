export const MOVE = "MOVE";
export const JUMP_TO = "JUMP_TO";
export const SELECTION_TOGGLE = "SELECTION_TOGGLE";
export const CLICKED = "CLICKED";
export const SELECTED = "SELECTED";

export const move = (index) => {
    return {
        type: MOVE,
        payload: { index }
    }
}

export const jumpTo = (step) => {
    return {
        type: JUMP_TO,
        payload: { step }
    }
}

export const selectionToggle = (i) => {
    return {
        type: SELECTION_TOGGLE,
        payload: { index: i }
    }
}

export const clicked = (i) => {
    return {
        type: CLICKED,
        payload: { index: i }
    }
}

export const selected = (i) => {
    return {
        type: SELECTED,
        payload: { index: i }
    }
}