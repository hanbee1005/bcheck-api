module.exports = app => {
    const books = require('../controllers/book.controller')
    const router = require('express').Router()

    // Create a new Book
    router.post('/', books.create)

    // Retrieve all Books
    router.get('/', books.findAll)

    app.use('/api/books', router)
}
