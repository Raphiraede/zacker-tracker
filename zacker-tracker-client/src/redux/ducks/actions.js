
import { createAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const testAction = createAction('testAction')

const testFetch = createAsyncThunk(
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

export {
  testAction,
  testFetch
}