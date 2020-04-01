import { createReducer } from "@reduxjs/toolkit"
import { createAsyncThunk } from '@reduxjs/toolkit'



export const getUserInfo = createAsyncThunk(
  'getUserInfo',
  async () => {
    const response = await fetch(
      '/user-info',
      {
        method: 'GET',
        credentials: 'same-origin',
      }
    )
    return response.json()
  }
)

const initialState = {
  status: 'empty dataset',
  google_id: '',
  name: '',
}

const userInfo = createReducer(initialState, {
  [getUserInfo.pending]: (state, action) => {
  },
  [getUserInfo.fulfilled]: (state, action) => {
    console.log('fulfilled')
    console.log('action:', action)
    console.log('action.payload:', action.payload)
    state.status = 'fulfilled'
    state.google_id = action.payload.google_id
    state.name = action.payload.name
    console.log('state:', state)
  },
  [getUserInfo.rejected]: (state, action) => {
  }
})
export {userInfo}




export const confirmUserInfoForSignIn = createAsyncThunk(
  'confirmUserInfo',
  async (payload, thunkApi) => {
    const response = await fetch(
      '/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      }
    )
    thunkApi.dispatch(getUserInfo())
    return 
  }
)

export const testFetch = createAsyncThunk(
  'testFetch',
  async () => {
    const response = fetch(
      '/protected',
      {
        credentials: 'same-origin'
      }
    )
    return (await response).json()
  }
)