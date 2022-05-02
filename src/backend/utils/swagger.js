const swaggerAutogen = require('swagger-autogen')()

// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
require('mandatoryenv').load(['BACKEND_ENDPOINT', 'PROTOCOL'])
const {BACKEND_ENDPOINT} = process.env
const {PROTOCOL} = process.env

const doc = {
    info: {
        title: 'AMAP project',
        description: 'API for AMAP project application'
    },
    host: BACKEND_ENDPOINT,
    schemes: [
        PROTOCOL
    ]
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/backend/routes/consumers.js', 'src/backend/routes/producers.js', 'src/backend/routes/router.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => console.info('Swagger output generated'))
