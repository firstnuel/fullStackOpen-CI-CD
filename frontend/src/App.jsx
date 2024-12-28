import AllBlogs from './components/AllBlogs'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAndSetUser } from './reducers/userReducer'
import { fetchUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import LoginForm from './components/LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


function App() {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(fetchAndSetUser())
  }, [dispatch])

  useEffect(() => {
    if(user)dispatch(initializeBlogs())
  }, [dispatch, user])

  useEffect(() => {
    if(user)dispatch(fetchUsers())
  }, [dispatch, user])

  return <>{user ? <AllBlogs blogFormRef={blogFormRef} /> : <LoginForm />}</>
}

export default App
