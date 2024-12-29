import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div className='users'>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export const UserBlogs = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)

  if (!users || !users.length) return null

  const user = users.find(user => user.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className='users' >
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}
