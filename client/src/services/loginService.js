import axios from 'axios'
const baseUrl = '/api/login'
const userUrl = 'api/users'
import { token } from './blogs'

const login = async (userLogin) => {
  const response = await axios.post(baseUrl, userLogin)
  return response.data
}

const users = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(userUrl, config)
  return response.data
}

export default { login, users }
