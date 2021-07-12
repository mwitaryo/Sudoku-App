import { SET_ERROR, SET_FILLED_BOARD, SET_INITIAL_BOARD, SET_LEADERBOARD, SET_PLAYER, SET_SOLVED_BOARD, SET_STATUS, SET_TIMER } from "../actionType"

const initialState = {
  initialBoard: [],
  filledBoard: [],
  solvedBoard: [],
  status: '',
  // player: {
  //   name: '',
  //   score: 0,
  //   time: 0,
  //   difficulty: '',
  // },
  leaderboard: []
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  if (type === SET_INITIAL_BOARD) return { ...state, initialBoard: payload }
  if (type === SET_FILLED_BOARD) return { ...state, filledBoard: payload }
  if (type === SET_SOLVED_BOARD) return { ...state, solvedBoard: payload }
  if (type === SET_ERROR) return { ...state, error: payload }
  if (type === SET_STATUS) return { ...state, status: payload }
  // if (type === SET_PLAYER) return { ...state, player: payload }
  if (type === SET_LEADERBOARD) return { ...state, leaderboard: payload }
  if (type === SET_TIMER) return { ...state, timer: payload }

  return state
}