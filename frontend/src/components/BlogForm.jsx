import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogsReducer'
import { useField } from '../hooks'

const BlogForm = ({ blogFormRef }) => {
  const { reset: titleReset, ...title } = useField('title')
  const { reset: authorReset,  ...author } = useField('author')
  const { reset: urlReset, ...url } = useField('url')

  const dispatch = useDispatch()

  const handleCreateNew = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createNew(newBlog))
    titleReset()
    authorReset()
    urlReset()
    blogFormRef.current.toggleVisibility()
  }

  const handleClose = () => blogFormRef.current.toggleVisibility()

  return (
    <div className='form create'>
      <h2>Create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <div className='createButtons'>
          <button className='createButton' type="submit">create</button>
          <button className='cancelButton' onClick={handleClose} >cancel</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm