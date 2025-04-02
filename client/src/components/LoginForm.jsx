import Notification from './Notification'
import { logInUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import RegisterForm from './RegisterForm'

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
    <>
    <div className='login form' id='login'>
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
        <p>Dont have an account? <a href="#register">Register</a></p>
      </form>
    </div>


    <RegisterForm />
    </>
  )
}

export default LoginForm
