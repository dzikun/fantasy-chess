const MOVE = "MOVE";
const JUMP_TO = "JUMP_TO";

const move = (index) => {
    return {
        type: MOVE,
        payload: { index }
    }
}


const jumpTo = (step) => {
    return {
        type: JUMP_TO,
        payload: { step }
    }
}