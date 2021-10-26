const db = require('../models')
const Book = db.book

const Op = db.Sequelize.Op

// Find All Books (with title, owner_name)
exports.findAll = (req, res) => {
    const word = req.query.word
    const condition = word
        ? { [Op.or]: [
                { title: {[Op.iLike]: `%${word}%`}},
                { owner_name: {[Op.iLike]: `%${word}%`}},
                { isbn: {[Op.iLike]: `%${word}%`}}
             ]
            }
        : null

    Book.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving books.'
            })
        })
}

// Create and Save a new Book
exports.create = (req, res) => {
    // TODO: Validate request
    // 1. isbn 확인
    // 2. owner_email 확인

    // Create a Book
    const book = {
        title: req.body.title,
        link: req.body.link,
        image: req.body.image,
        author: req.body.author,
        price: req.body.price,
        discount: req.body.discount || '-',
        publisher: req.body.publisher,
        pubdate: req.body.pubdate,
        isbn: req.body.isbn,
        description: req.body.description,
        owner_email: req.body.owner_email,
        owner_name: req.body.owner_name,
        del_yn: 'N',
    }

    // Save Book in the database
    Book.create(book)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Book.'
            })
        })
}

// Update Book Owner

// Delete Book
