import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'

const usersSlice = createSlice({
  name : 'users',
  initialState : [],
  reducers : {
    allUsers (state, action) {
      return action.payload
    }
  }
})

export const { allUsers } = usersSlice.actions
export default usersSlice.reducer

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const users = await loginService.users()
      dispatch(allUsers(users))
    } catch (e) {
      console.error(e)
    }
  }
}