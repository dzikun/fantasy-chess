
import { MOVE } from "../actions";

const initialState = {
    history: [
        {
            squares: Array(64).fill(null),
            winner: null
        }
    ],
    stepNumber: 0,
    xIsNext: true,
    winner: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MOVE: {
            const { index } = action.payload;

            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (current.winner || squares[index]) {
                return state;
            }
            squares[index] = state.xIsNext ? "X" : "O";
            const winner = calculateWinner(squares);
            return {
                ...state,
                history: history.concat([
                    {
                        squares: squares,
                        winner: winner
                    }
                ]),
                stepNumber: history.length,
                xIsNext: !state.xIsNext
            };
        }

        /*
        case JUMP_TO: {
            const { step } = action.payload;
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0
            };
        }
        */
        default:
            return state;
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
