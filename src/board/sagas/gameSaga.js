import { all, takeLatest, select, put, takeEvery, delay } from "redux-saga/effects";
import { COMMAND_MOVE_SELECTED, COMMAND_MOVE, commandMove, move } from "../actions"

export function* gameSaga() {
    yield all([
        takeLatest(COMMAND_MOVE_SELECTED, moveSelectedSaga),
        takeEvery(COMMAND_MOVE, movePieceSaga)
    ]);
}

function* moveSelectedSaga(action) {
    const selected = yield select(state => state.pieces.pieces.filter(p => p && p.selected))
    yield all(selected.map(piece => put(commandMove(piece.point, action.payload.dest))))
}

function* movePieceSaga(action) {
    const {src, dest} = action.payload;
    const vector = {
        x: dest.x - src.x,
        y: dest.y - src.y
    }
    const stepVector = {
        x: vector.x === 0 ? 0 : vector.x / Math.abs(vector.x),
        y: vector.y === 0 ? 0 : vector.y / Math.abs(vector.y)
    }
    const step = {
        x: src.x + stepVector.x,
        y: src.y + stepVector.y
    }
    let valid = yield isDestinationValid(step)
    for (let i = 0; i < 10 && !valid; i++) {
        yield delay(100)
        valid = yield isDestinationValid(step)
    }
    if (valid) {
        yield put(move(src, step))
        if (step.x !== dest.x || step.y !== dest.y) {
            yield delay(200)
            yield put(commandMove(step, dest))
        }
    }
}

function* isDestinationValid(dest) {
    return yield select(state => !state.pieces.pieces.some(p => p.point.x === dest.x && p.point.y === dest.y))
}