import { combineReducers } from "redux"
import { userInfo } from './ducks/auth'

const initialState = {
  userInfo: false
}
const rootReducer = combineReducers(initialState, {
  userInfo: userInfo
})

export default rootReducer