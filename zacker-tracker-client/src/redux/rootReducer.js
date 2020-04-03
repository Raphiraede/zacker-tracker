import { combineReducers } from "redux"
import { userInfo } from './ducks/auth'
import { projects } from './ducks/projects'

const rootReducer = combineReducers({
  userInfo: userInfo,
  projects: projects
})

export default rootReducer