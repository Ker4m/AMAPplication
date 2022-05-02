// ---------------------------------------------
// ----------- cf doc/backendAPI.md ------------
// ---------------------------------------------


// -------- /consumers ---------

const app = require('../../../src/backend/app')
const request = require('supertest')
const { token } = require('morgan')
const path = '/consumers'
const TOKEN = process.env.TEST_TOKEN

describe('Test for /consumers', () => {
    test('empty get', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Returning consumers')
        expect(response.body.data.length).toBe(0)
    })

    test('Add a consumer', async () => {
        const response = await request(app)
            .post(path)
            .send({firstName: 'Nicolas', name: 'Ferlut', address: '15 rue Antoine Polotti, 38400 Saint-Martin-D\'Hères', email:'nicolas.ferlut@nsigma.fr'})
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Consumer Added')
    })

    test('Verify if get consumers return one consumer and it\'s Nicolas', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Returning consumers')
        expect(response.body.data.length).toBe(1)
        expect(response.body.data[0].firstName).toBe('Nicolas')
    })

    test('Add a consumer but without giving info', async () => {
        const response = await request(app)
            .post(path)
        expect(response.statusCode).toBe(400)
    })

    test('method put returning an error', async () => {
        const response = await request(app)
            .put(path)
        expect(response.statusCode).toBe(405)
    })

    test('Delete all consumers', async () => {
        const response = await request(app)
            .delete(path)
        expect(response.statusCode).toBe(200)
    })

    test('And finally verify if get /consumers returns an empty object', async () => {
        const response = await request(app)
            .get(path)
        expect(response.body.data.length).toBe(0)
    })


    // Same but add two consumers
    test('Add a consumer', async () => {
        const response = await request(app)
            .post(path)
            .send({firstName: 'Hugo', name: 'Dabadie', address: '15 impasse, 38000 Grenoble', email:'hugo.dabadie@nsigma.fr'})
        expect(response.statusCode).toBe(201)
    })

    test('Add a consumer', async () => {
        const response = await request(app)
            .post(path)
            .send({firstName: 'Marek', name: 'Elmayan', address: '16 impasse, 38000 Grenoble', email:'marek.elmayan@gmail.com'})
        expect(response.statusCode).toBe(201)
    })

    test('Verify if get consumers return two consumers', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(2)
    })

    test('Clean consumers', async () => {
        const response = await request(app)
            .delete(path)
        expect(response.statusCode).toBe(200)
    })

})
