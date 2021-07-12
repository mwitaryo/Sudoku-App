import { applyMiddleware, createStore } from "redux";
import reduxThunk from 'redux-thunk'
import reducer from './reducer'

const middlewares = applyMiddleware(reduxThunk)
const store = createStore(reducer, middlewares)

export default store