import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      )
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    rmBlog(state, action) {
      const removedBlog = action.payload
      return state.filter((blog) => blog.id !== removedBlog.id)
    },
  },
})

export const { setBlogs, updateBlog, appendBlog, rmBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addLike = (blogToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      })
      if (updatedBlog) {
        dispatch(updateBlog(updatedBlog))
        dispatch(setNotification('likes updated', true))
      }
    } catch (error) {
      const errMsg = 'could not update likes'
      dispatch(setNotification(errMsg, false))
    }
  }
}

export const createNew = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      if (createdBlog) {
        dispatch(appendBlog(createdBlog))
        const successMsg = `a new blog ${createdBlog.title} by ${createdBlog.author} added`
        dispatch(setNotification(successMsg, true))
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Failed to create blog'
      dispatch(setNotification(errMsg, false))
    }
  }
}

export const removeBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      const deleteStatus = await blogService.deleteBlog(blogToDelete.id)
      if (deleteStatus === 204) {
        dispatch(rmBlog(blogToDelete))
        dispatch(setNotification('Blog deleted', true))
      }
    } catch (error) {
      const errMsg = 'could not delete blog'
      dispatch(setNotification(errMsg, false))
    }
  }
}

export const addComment = (comment, blogToUpdate) => {
  return async dispatch => {
    try{
      const updatedBlog = await blogService.update(blogToUpdate.id, {
        ...blogToUpdate,
        comments : [...blogToUpdate.comments, comment]
      })
      if(updatedBlog) {
        dispatch(updateBlog(updatedBlog))
        dispatch(setNotification('comment added', true))
      }
    } catch (e){
      console.error(e)
      dispatch(setNotification('Failed to add comment', false))
    }
  }
}