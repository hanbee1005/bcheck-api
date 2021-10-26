# bcheck api
도서 관리 프로젝트 api

## 프로젝트 구조
```
├── app
│   ├── config        ···# 환경 구성 (db 설정, swagger 설정 등)
│   ├── controllers   ···# controller (router에 맞는 처리 로직)
│   ├── models        ···# db 데이터 모델
│   ├── swagger       ···# swagger schemas
│   └── routes        ···# HTTP Router 설정
├── server.js         ···# 서버 시작 파일
├── package.json      
└── node_modules
```

### 기본 설정
```shell
npm init

npm install express sequelize sequelize-cli pg pg-hstore cors --save

sequelize init
```
``` sequelize init ``` 을 하고 나면 **config/config.json, models/index.js** 생성
- config.json : 환경에 맞게 Database Connection 설정 정보를 지정
- models/index.js : sequelize 설정 및 model 정보 설정

### Swagger 설정
http://localhost:9090/api/api-docs/#/
- swagger 관련 라이브러리 추가
```shell
npm i swagger-ui-express swagger-jsdoc
```
- swagger 설정 파일 작성 (app/config/swagger.js)
```js
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: '프로젝트_타이틀',
            version: '프로젝트_버전',
            description: '프로젝트_설명',
            contact: {
                name: '관리자명',
                url: '관리자_페이지',
                email: '관리자_이메일'
            },
        },
    },
    apis: ['api_및_schema_파일_위치', ...]
}

const specs = swaggerJsdoc(options)

module.exports = {
    swaggerUi,
    specs
}
```
- swagger 설정 파일 추가 (server.js)
```js
...

// swagger
const { swaggerUi, specs } = require('./app/config/swagger')
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

...
```
- schema 작성 (yaml 파일 사용)
```yaml
components:
  schemas:
    스키마명1:
      properties:
        필드명1:
          type: string
          description: 설명
          example: 예시
        필드명2:
          $ref: '#/components/schemas/스키마명2'
    스키마명2:
      properties:
        필드명1:
          type: string
          description: 설명
          example: 예시
        필드명2:
          type: string
          description: 설명
          example: 예시
```
- api 작성
  - /api/books 로 put 메소드를 통해 들어오는 요청에 대한 예시
```js
/**
 * @swagger
 * /api/books:
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
```
