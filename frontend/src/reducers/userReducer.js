import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/loginService'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logOut() {
      window.localStorage.removeItem('loggedBlogAppUser')
      return null
    },
  },
})

export const { setUser, logOut, logIn } = userSlice.actions
export default userSlice.reducer

export const fetchAndSetUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logInUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userDetails)
      if (user) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
        dispatch(setNotification('Login successful', true))
      }
    } catch (error) {
      const errMsg = 'wrong username or password'
      dispatch(setNotification(errMsg, false))
    }
  }
}
