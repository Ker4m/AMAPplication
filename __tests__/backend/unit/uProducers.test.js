// ---------------------------------------------
// ----------- cf doc/backendAPI.md ------------
// ---------------------------------------------


// -------- /producers ---------

const app = require('../../../src/backend/app')
const request = require('supertest')
const path = '/producers'

describe('Test for /producers', () => {
    test('empty get', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(0)
    })

    test('Add a producer', async () => {
        const response = await request(app)
            .post(path)
            .send({firstName: 'Sebastien', name: 'Granie', address: '3 Pl. Claveyson, 38000 Grenoble', email:'sebastien.granie@nsigma.fr'})
        expect(response.statusCode).toBe(201)
    })

    test('Verify if get producers returns one producer and it\'Sebastien', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.data[0].firstName).toBe('Sebastien')
    })

    test('Add a producer but without giving info', async () => {
        const response = await request(app)
            .post(path)
        expect(response.statusCode).toBe(400)
    })

    test('method put returning an error', async () => {
        const response = await request(app)
            .put(path)
        expect(response.statusCode).toBe(405)
    })

    test('Delete all producers', async () => {
        const response = await request(app)
            .delete(path)
        expect(response.statusCode).toBe(200)
    })

    test('And finally verify if get /producers returns an empty object', async () => {
        const response = await request(app)
            .get(path)
        expect(response.body.data.length).toBe(0)
    })

})
