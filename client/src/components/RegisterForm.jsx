import Notification from './Notification'
import { logInUser, registerUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'



const RegisterForm = () => {
    const { reset: nameReset, ...name } = useField('name')
    const { reset: usernameReset, ...username } = useField('username')
    const { reset: passwordReset, ...password } = useField('password')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (event) => {
        event.preventDefault()
        dispatch(registerUser({ 
            name: name.value,
            username: username.value, 
            password: password.value 
        }))
        usernameReset()
        passwordReset()
        nameReset()
        navigate('#login')
    }


    return (
        <div className='login form' id='register' >
        <h2>Welcome</h2>
        <Notification />
        <form onSubmit={handleRegister}>
        <div>
            name
            <input {...name}
              autoComplete="name" />
          </div>
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
          <button type="submit">register</button>
          <p>Do you have an account? <a href="#login">Login</a></p>
        </form>
      </div>
    )
}

export default RegisterForm