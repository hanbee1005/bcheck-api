const db = require('../models')
const Book = db.book

const Op = db.Sequelize.Op

const util = require('../utils/common')

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
            res.json(util.makeResponseBody(200, '도서 조회 성공', data))
        })
        .catch(err => {
            res.status(500).json(util.makeResponseBody(500, err.message || 'Some error occurred while retrieving books.', {}))
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
            res.json(util.makeResponseBody(200, '도서 등록 성공', data))
        })
        .catch(err => {
            res.status(500).json(util.makeResponseBody(500, err.message || 'Some error occurred while creating the Book.', {}))
        })
}

// Update Book Owner
exports.update = (req, res) => {
    const id = req.params.id

    Book.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.json(util.makeResponseBody(200, '도서 소유자 변경 성공', 'Book Owner was updated successfully.'))
            } else {
                res.json(util.makeResponseBody(404, '도서 소유자 변경 실패', `Cannot update Book Owner with id=${id}. Maybe Book was not found or req.body is empty!`))
            }
        })
        .catch(err => {
            res.status(500).json(util.makeResponseBody(500, err.message || `Error updating Book Owner with id=${id}`, {}))
        })
}

// Delete Book
exports.delete = (req, res) => {
    const id = req.params.id

    req.body.del_yn = 'Y'

    Book.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.json(util.makeResponseBody(200, '도서 삭제 성공', 'Book was deleted successfully.'))
            } else {
                res.json(util.makeResponseBody(404, '도서 삭제 실패', `Cannot delete Book Owner with id=${id}. Maybe Book was not found or req.body is empty!`))
            }
        })
        .catch(err => {
            res.status(500).json(util.makeResponseBody(500, err.message || `Error delete Book with id=${id}`, {}))
        })
}
