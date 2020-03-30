import {testAction} from '../actions/actions.js'
import {testFetch} from '../actions/actions.js'

import { createReducer } from '@reduxjs/toolkit'


const initialState = {
  test: "testing",
  number: 1,
  userInfo: {

  }
}

const rootReducer = createReducer(initialState, 
  {
    [testAction]: (state, action) => {
      console.log(action.type)
      state.number++
    },
    [testFetch.pending]: (state, action) => {
      console.log('pending')
      console.log('state', state)
      console.log('action', action)
    },
    [testFetch.fulfilled]: (state, action) => {
      console.log('fulfilled')
      console.log('state', state)
      console.log('action', action)
      state.userData = action.payload
    },
    [testFetch.rejected]: (state, action) => {
      console.log('rejected')
      console.log('state', state)
      console.log('action', action)
    }
  }
)

export { rootReducer }