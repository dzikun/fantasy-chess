export const MOVE = "MOVE";
export const JUMP_TO = "JUMP_TO";

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