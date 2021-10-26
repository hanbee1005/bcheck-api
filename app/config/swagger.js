const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'bCheck API',
            version: '1.0.0',
            description: 'bCheck API with nodejs + express',
            contact: {
                name: 'hanbee',
                url: 'https://github.com/hanbee1005',
                email: 'sonhanbi1002@gmail.com'
            },
        },
        host: 'localhost:9090',
        basePath: '/',
    },
    apis: ['./app/routes/*.js', './app/swagger/*']
}

const specs = swaggerJsdoc(options)

module.exports = {
    swaggerUi,
    specs
}
