import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', success: false },
  reducers: {
    notify(state, action) {
      return {
        message: action.payload.message,
        success: action.payload.success,
      }
    },
    rmNotification() {
      return { message: '', success: false }
    },
  },
})

export const setNotification = (message, success) => {
  return (dispatch) => {
    dispatch(notify({ message, success }))
    setTimeout(() => {
      dispatch(rmNotification())
    }, 3000)
  }
}

export const { notify, rmNotification } = notificationSlice.actions
export default notificationSlice.reducer
