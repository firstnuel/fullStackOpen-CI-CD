const _ = require('lodash')
const dummy = blog => 1

const totalLikes = blogList => blogList.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = blogList => {
    const highestLikes = Math.max(...blogList.map(blog => blog.likes))
    return blogList.find(blog => blog.likes === highestLikes)
}
const mostBlogs = blogList => {
    const groupedList =  _.groupBy(blogList, 'author')
    const mostBlog =  _.orderBy(Object.keys(groupedList).map(author => [author, groupedList[author].length]), [1],['desc'])[0]
    return {
        author: mostBlog[0],
        blogs: mostBlog[1]
    }
}

const mostLikes = blogList => {
    const groupedList =  _.groupBy(blogList, 'author')
    const mostLikes =  _.orderBy(Object.keys(groupedList).map(author => [author, totalLikes(groupedList[author])]), [1],['desc'])[0]
    return {
        author: mostLikes[0],
        likes: mostLikes[1]
    }
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } 