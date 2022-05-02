// ---------------------------------------------
// ----------- cf doc/backendAPI.md ------------
// ---------------------------------------------


// -------- /organizer ---------

const app = require('../../../src/backend/app')
const request = require('supertest')
const path = '/organizer'

describe('Test for /organizer', () => {
    test('empty get', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
    })

    test('Add an organizer', async () => {
        const response = await request(app)
            .post(path)
            .send({firstName: 'Nicolas', name: 'Ferlut', address: '15 rue Antoine Polotti, 38400 Saint-Martin-D\'Hères', email:'nicolas.ferlut@nsigma.fr'})
        expect(response.statusCode).toBe(201)
    })

    test('Verify if get organizer return one organizer and it\'s Nicolas', async () => {
        const response = await request(app)
            .get(path)
        expect(response.statusCode).toBe(200)
        // expect(response.body.length).toBe(1)
        expect(response.body.data.firstName).toBe('Nicolas')
    })

    test('Add a organizer but without giving info', async () => {
        const response = await request(app)
            .post(path)
        expect(response.statusCode).toBe(400)
    })

    test('Delete organizer', async () => {
        const response = await request(app)
            .delete(path)
        expect(response.statusCode).toBe(200)
    })

    test('Assign Nicolas to organizer again', async () => {
        const response = await request(app)
            .put(path)
            .send({email: "nicolas.ferlut@nsigma.fr"})
        expect(response.statusCode).toBe(200)
    })

    test('Try to assign another organizer', async () => {
        const response1 = await request(app)
            .post('/consumers')
            .send({firstName: 'Nathan', name: 'Gicquel', email: 'nathan.gicquel@nsigma.fr', address: '3 rue Bayard'})
        expect(response1.statusCode).toBe(201)
        const response2 = await request(app)
            .put(path)
            .send({email: "nathan.gicquel@nsigma.fr"})
        expect(response2.statusCode).toBe(400)
        const response3 = await request(app)
            .delete('/consumers')
        expect(response3.statusCode).toBe(200)
    })

    test('Delete all organizer', async () => {
        const response = await request(app)
            .delete(path)
        expect(response.statusCode).toBe(200)
    })


})
