export const MOVE = "MOVE";
export const SELECTION_START = "SELECTION_START";
export const SELECTION_END = "SELECTION_END";
export const TOUCH = "TOUCH";

export const COMMAND_MOVE_SELECTED = "COMMAND_MOVE_SELECTED";
export const COMMAND_MOVE = "COMMAND_MOVE";


export const move = (source, destination) => {
    return {
        type: MOVE,
        payload: { source, destination }
    }
}

export const selectionStart = (point) => {
    return {
        type: SELECTION_START,
        payload: { point }
    }
}

export const selectionEnd = (point, shiftKey, ctrlKey, altKey) => {
    return {
        type: SELECTION_END,
        payload: { point, shiftKey, ctrlKey, altKey}
    }
}

export const touch = (point) => {
    return {
        type: TOUCH,
        payload: { point }
    }
}

export const commandMoveSelected = (dest) => {
    return {
        type: COMMAND_MOVE_SELECTED,
        payload: { dest: dest }
    }
}

export const commandMove = (src, dest) => {
    return {
        type: COMMAND_MOVE,
        payload: { src, dest }
    }
}
