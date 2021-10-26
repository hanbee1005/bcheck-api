module.exports = app => {
    const books = require('../controllers/book.controller')
    const router = require('express').Router()

    /**
     * @swagger
     * /api/books:
     *    post:
     *      tags:
     *      - Book
     *      description: 도서 등록
     *      produces:
     *      - application/json
     *      requestBody:
     *       content:
     *         'application/json':
     *           schema:
     *             $ref: '#/components/schemas/book_reg_req'
     *      responses:
     *       200:
     *        description: 책 정보
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/book_reg_res'
     */
    router.post('/', books.create)

    /**
     * @swagger
     * /api/books:
     *    get:
     *      tags:
     *      - Book
     *      description: 책 조회
     *      produces:
     *      - application/json
     *      parameters:
     *      - name: word
     *        in: query
     *        description: 책제목 or 소유자명 or ISBN
     *        example: '9788960771291'
     *        required: false
     *        schema:
     *          type: string
     *      responses:
     *       200:
     *        description: 책 정보
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/books_res'
     */
    router.get('/', books.findAll)

    /**
     * @swagger
     * /api/books/{id}:
     *    put:
     *      tags:
     *      - Book
     *      description: 도서 소유자 수정
     *      produces:
     *      - application/json
     *      parameters:
     *      - name: id
     *        in: path
     *        description: 도서 id
     *        example: '1'
     *        required: true
     *        schema:
     *          type: string
     *      requestBody:
     *       content:
     *         'application/json':
     *           schema:
     *             $ref: '#/components/schemas/book_owner_update_req'
     *      responses:
     *       200:
     *        description: 책 정보
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/book_owner_update_res'
     */
    router.put('/:id', books.update)

    /**
     * @swagger
     * /api/books/{id}:
     *    delete:
     *      tags:
     *      - Book
     *      description: 도서 삭제 (삭제 여부 수정)
     *      produces:
     *      - application/json
     *      parameters:
     *      - name: id
     *        in: path
     *        description: 도서 id
     *        example: '1'
     *        required: true
     *        schema:
     *          type: string
     *      requestBody:
     *       content:
     *         'application/json':
     *           schema:
     *             $ref: '#/components/schemas/book_delete_req'
     *      responses:
     *       200:
     *        description: 책 정보
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/book_delete_res'
     */
    router.delete('/:id', books.delete)

    app.use('/api/books', router)
}
