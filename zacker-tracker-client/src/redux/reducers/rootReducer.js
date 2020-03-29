import types from '../types/types.js'

function rootReducer(state,action){
  let newState = {...state}

  switch(action.type) {
    case types.TEST_TYPE:
      newState.number++
      return newState
    
    default:
      return newState
  }
}

export { rootReducer }