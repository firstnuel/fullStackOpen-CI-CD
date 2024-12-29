const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || username.length < 3 || !password || password.length < 3) {
    return response.status(400).json({
      error: 'username or name is less than minLength of (3)' })
  }
  const usernameExists = await User.findOne({ username }).exec()
  if(usernameExists) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  await user.save()

  response.status(201).json({ message: 'User created successfully', status: 'success' })
})


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter