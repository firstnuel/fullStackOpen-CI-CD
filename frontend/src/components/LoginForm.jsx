import Notification from './Notification'
import { logInUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useField('username')
  const { reset: passwordReset, ...password } = useField('password')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(logInUser({ username: username.value, password: password.value }))
    usernameReset()
    passwordReset()
  }

  return (
    <div className='login form'>
      <h2>log into application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username}
            autoComplete="username" />
        </div>
        <div>
          password
          <input {...password}
            autoComplete="current-password"
            type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
