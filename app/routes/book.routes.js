module.exports = app => {
    const books = require('../controllers/book.controller')
    const router = require('express').Router()

    // Create a new Book
    router.post('/', books.create)

    app.use('/api/books', router)
}
