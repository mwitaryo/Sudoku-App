import { SET_INITIAL_BOARD, SET_FILLED_BOARD, SET_SOLVED_BOARD, SET_ERROR, SET_STATUS, SET_PLAYER, SET_LEADERBOARD, SET_TIMER } from '../actionType'

export const setInitialBoard = (payload) => ({ type: SET_INITIAL_BOARD, payload })
export const setFilledBoard = (payload) => ({ type: SET_FILLED_BOARD, payload })
export const setSolvedBoard = (payload) => ({ type: SET_SOLVED_BOARD, payload })
export const setError = (payload) => ({ type: SET_ERROR, payload })
export const setStatus = (payload) => ({ type: SET_STATUS, payload })
export const setPlayer = (payload) => ({ type: SET_PLAYER, payload })
export const setTimer = (payload) => ({ type: SET_TIMER, payload })

export const setLeaderboard = (payload) => ({ type: SET_LEADERBOARD, payload })

export const fetchInitialBoard = (url) => async (dispatch) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    await dispatch(setInitialBoard([...data.board]))
    await dispatch(setFilledBoard([...data.board]))
  } catch (error) {
    dispatch(setError(error))
  }
}

export const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

export const encodeParams = (params) => async (dispatch) => {
  try {
    const data = await Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
    return data
  } catch (error) {
    dispatch(setError(error))
  }
}



export const fetchSolvedBoard = (url) => async (dispatch, getState) => {
  const { initialBoard } = getState()
  const data = { board: initialBoard }
  try {
    const encoded = await dispatch(encodeParams(data))
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded
    })
    const board = await response.json()
    await dispatch(setSolvedBoard(board.solution))
  } catch (error) {
    dispatch(setError(error))
  }
}


export const validateBoard = (url) => async (dispatch, getState) => {
  const { filledBoard, solvedBoard } = getState()

  const data = { board: solvedBoard.length > 0 ? solvedBoard : filledBoard }
  try {
    const encoded = await dispatch(encodeParams(data))
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded
    })
    const board = await response.json()
    dispatch(setStatus(board.status))

  } catch (error) {
    dispatch(setError(error))
  }
}
