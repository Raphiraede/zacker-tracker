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
    return response.body
  }
)


const userInfo = createReducer({
  [getUserInfo.pending]: (state, action) => {
  },
  [getUserInfo.fulfilled]: (state, action) => {
    state.userInfo = action.body
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