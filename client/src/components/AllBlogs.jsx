import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Blog, BlogView } from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Users, UserBlogs } from './Users'
import { Routes, Route, Link } from 'react-router-dom'

const BlogList = ({ user, blogFormRef, blogs }) => {
  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef} >
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  )
}

const AllBlogs = ({ blogFormRef }) => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className='container'>
      <h2 className='title'>blogs</h2>
      <Notification />
      <nav className='nav'>
        <Link to={'/'} >blogs</Link>
        <Link to={'/users'} >Users</Link>
        <div className='user'>{user.name} logged in <button onClick={handleLogOut}>logout</button></div>
      </nav>
      <Routes>
        <Route path="/" element={<BlogList user={user} blogs={blogs} blogFormRef={blogFormRef} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserBlogs />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default AllBlogs
