import { combineReducers } from "redux"
import { userInfo } from './ducks/auth'

const rootReducer = combineReducers({
  userInfo: userInfo
})

export default rootReducer