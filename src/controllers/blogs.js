const blogsRouter =  require('express').Router()
const { ObjectId } = require('mongodb')
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const user = request.user
  body.likes = !body.likes ? 0 : body.likes

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = new Blog({ ...body, user:user.id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {

  const { id } = request.params
  if (!ObjectId.isValid(id))
    return response.status(400).json({ error: 'id is not valid' })

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })

  response.json(blog)
})

blogsRouter.delete('/:id', async (request , response) => {

  const { id } = request.params
  const user = request.user

  if (!ObjectId.isValid(id))
    return response.status(400).json({ error: 'id is not valid' })

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })

  if(blog.user && (blog.user.toString() !== user.id.toString()))
    return response.status(401).json({ error: 'You are not authorized to delete this blog' })

  await Blog.findByIdAndDelete(id)
  return response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user
  const { id } = request.params
  if (!ObjectId.isValid(id))
    return response.status(400).json({ error: 'id is not valid' })

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  if(blog.user && (blog.user.toString() !== user.id.toString()))
    return response.status(403).json({ error: 'You are not authorized to update this blog' })


  const updatedBlogData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments : body.comments || blog.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData, { new: true })
  return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
