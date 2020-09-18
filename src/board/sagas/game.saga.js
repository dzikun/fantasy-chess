import { all, takeLatest, select, put, takeEvery, delay, actionChannel } from "redux-saga/effects";
import { COMMAND_MOVE_SELECTED, COMMAND_MOVE, commandMove, move, reserve } from "../actions"

export function* gameSaga() {
    const moveChannel = yield actionChannel(COMMAND_MOVE)
    yield all([
        takeLatest(COMMAND_MOVE_SELECTED, moveSelectedSaga),
        takeEvery(moveChannel, movePieceSaga)
    ]);
}

function* moveSelectedSaga(action) {
    const selectedIds = yield select(state => state.map.selected.toArray());
    yield all(selectedIds
        .filter(id => id !== null && id !== undefined)
        .map(id => put(commandMove(id, action.payload.dest))))
}

function* movePieceSaga(action) {
    const {id, dest} = action.payload;
    const square = yield select(state => state.map.board.find(v => v.occupied === id));
    const src = square.point;
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
    // for (let i = 0; i < 10 && !valid; i++) {
    //     yield delay(100)
    //     valid = yield isDestinationValid(step)
    // }
    if (valid) {
        yield put(reserve(id, step))
        // yield delay(50)
        yield put(move(id, src, step))
        if (step.x !== dest.x || step.y !== dest.y) {
            yield delay(200)
            yield put(commandMove(id, dest))
        }
    }
}

function* isDestinationValid(dest) {
    const key = dest.x + "," + dest.y;
    const square = yield select(state => state.map.board.get(key));
    return !square.occupied;
}