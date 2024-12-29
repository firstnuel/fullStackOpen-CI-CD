import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { addComment, addLike, removeBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export const Blog = ({ blog }) => {

  return (
    <div className="blog" data-testid="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
      </div>
    </div>
  )
}


export const Comments = ({ blog }) => {

  const comments = blog.comments
  const dispatch = useDispatch()

  const { reset, ...comment } = useField('comment')
  const handleComment = () => {
    dispatch(addComment(comment.value, blog))
    reset()
  }

  return (
    <>
      <h3>comments</h3>
      <input {...comment} className='comment' />
      <button onClick={handleComment} >add comment</button>
      <ul>
        {comments ? comments.map(comment => <li key={uuidv4()}>{comment}</li>) : null}
      </ul>
    </>
  )
}


export const BlogView = () => {
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blogs || !blogs.length) return null

  const blog = blogs.find(blog => blog.id === id)

  if(!blog) return <>Blog not found</>

  const handleLikes = () => {
    dispatch(addLike(blog))
  }
  const handleDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
      dispatch(removeBlog(blog))
  }

  return(
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLikes}>like</button></div>
      <div>added by {blog.author}</div>
      {blog.user === user.id && (
        <div>
          <button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
                remove
          </button>
        </div>
      )}
      <Comments blog={blog} />
    </>
  )
}

