import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  'fetchProjects',
  async (payload, thunkApi) => {
    const response = await fetch(
      '/get-projects',
      {
        method: 'GET',
        credentials: 'same-origin'
      }
    )
    console.log("project response body:", response.body)
    return response.json()
  }
)
const initialState = {
  status: 'empty dataset',
  projectsRaw: [],
  projectsParsed: []
}

const projects = createReducer(initialState, {
  [fetchProjects.pending]: (state, action) => {
  },
  [fetchProjects.fulfilled]: (state, action) => {
    console.log('project reducer')
    console.log('action payload:', action.payload)
    console.log('query response', action.payload.rows)
    state.status = 'fulfilled'
    state.projectsRaw = action.payload.rows
    //parsed projects will be a 2d array
    let projectsParsed = []
    action.payload.rows.forEach(row => {
      const parsedRow = [row.id, row.name, row.description, row.created, row.modified]
      projectsParsed.push(parsedRow)
    })
    state.projectsParsed = projectsParsed
  },
  [fetchProjects.rejected]: (state, action) => {
  }
})

export const createNewProject = createAsyncThunk(
  'createNewProject',
  async (payload, thunkApi) => {
    const {name, description} = payload
    const body = {
      name,
      description,
    }
    console.log('body')
    const response = await fetch(
      '/create-project',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body: JSON.stringify(body)
      }
    )
    thunkApi.dispatch(fetchProjects())
    return
  }
)

export {projects}
