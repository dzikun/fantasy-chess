export const INIT = "INIT";
export const PLACE = "PLACE";
export const RESERVE = "RESERVE";
export const MOVE = "MOVE";
export const SELECTION_START = "SELECTION_START";
export const SELECTION_END = "SELECTION_END";
export const TOUCH = "TOUCH";

export const COMMAND_MOVE_SELECTED = "COMMAND_MOVE_SELECTED";
export const COMMAND_MOVE = "COMMAND_MOVE";

export const init = (width, height) => {
    return {
        type: INIT,
        payload: { width, height }
    }
}

export const place = (id, dest) => {
    return {
        type: PLACE,
        payload: { id, dest }
    }
}

export const reserve = (id, dest) => {
    return {
        type: RESERVE,
        payload: { id, dest }
    }
}

export const move = (id, src, dest) => {
    return {
        type: MOVE,
        payload: { id, src, dest }
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
        payload: { point, shiftKey, ctrlKey, altKey }
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

export const commandMove = (id, dest) => {
    return {
        type: COMMAND_MOVE,
        payload: { id, dest }
    }
}
