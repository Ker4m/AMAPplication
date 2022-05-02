// ---------------------------------------------
// ----------- cf doc/backendAPI.md ------------
// ---------------------------------------------

// -------- Contract signature ---------

const app = require('../../../src/backend/app')
const request = require('supertest')



describe('Contract signature', () => {
    test('Add a producer', async () => {
        const response = await request(app)
            .post('/producers')
            .send({firstName: 'Sebastien', name: 'Granie', address: '3 Pl. Claveyson, 38000 Grenoble', email:'sebastien.granie@nsigma.fr'})
        expect(response.statusCode).toBe(201)
    })

    let idSeb = -1
    test('Get the id and add a proposal', async () => {
        const response1 = await request(app)
            .get('/producers')
        const data = response1.body.data
        for (const elem of data) {
            const {email} = elem
            if (email === 'sebastien.granie@nsigma.fr') {
                idSeb = elem.producerId
            }
        }
        const response2 = await request(app)
            .post('/producers/' + idSeb + '/proposals')
            .send({duration: '10', product: 'aubergine', quantity:'50', unit: 'kg', beginningProposal: '2022-05-23'})
            .catch(err => console.warn(err))
        expect(response2.statusCode).toBe(201)
    })

    let propID = -1
    test('Get the Id of the proposal of aubergines', async () => {
        const response = await request(app)
            .get('/producers/proposals')
        const data = response.body.data
        for (const elem of data) {
            if (elem.product === 'aubergine') {
                const {proposalId} = elem
                propID = proposalId
            }
        }
        expect(response.statusCode).toBe(200)
    })

    test('Add a consumer', async () => {
        const response = await request(app)
            .post('/consumers')
            .send({firstName: 'Gregoire', name: 'Rabusson', address: '3 rue Bayard, 38000 Grenoble', email:'gregoire.rabusson@nsigma.fr'})
        expect(response.statusCode).toBe(201)
    })

    let idGreg = -1
    test('Get the id of Greg', async () => {
        const response1 = await request(app)
            .get('/consumers')
        const data = response1.body.data
        for (const elem of data) {
            const {email} = elem
            if (email === 'gregoire.rabusson@nsigma.fr') {
                idGreg = elem.consumerId
            }
        }
    })

    test('Contract demand by consumer Greg on the proposal of Seb', async () => {
        let prodId = -1
        const resp = await request(app)
            .get('/producers/proposals')
        const data = resp.body.data
        for (const elem of data) {
            if (elem.product === 'aubergine') {
                const {proposalId} = elem
                prodId = proposalId
            }
        }
        const response = await request(app)
            .post('/consumers/' + idGreg + '/proposals/' + prodId)
            .send({quantityForConsumer: 5, unitForConsumer: 'kg'})
        expect(response.statusCode).toBe(200)
    })

    let contractID
    test('Get the contract Id', async () => {
        const response = await request(app)
            .get('/producers/' + idSeb + '/contracts')
        const data = response.body.data
        for (const elem of data) {
            if (elem.contractConsumerId === idGreg) {
                const {contractId} = elem
                contractID = contractId
            }
        }
        expect(response.statusCode).toBe(200)
    })

    test('Validate the contract', async () => {
        const response = await request(app)
            .put('/producers/' + idSeb + '/contracts/' + contractID)
            .send({beginningContract: '2022-05-30'})
        expect(response.statusCode).toBe(200)
    })

    test('Check that consumer has 1 contract', async () => {
        const response = await request(app)
            .get('/consumers/' + idGreg + '/contracts')
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(1)
    })

    test('Clean tables', async () => {
        await request(app)
            .delete('/consumers')
        await request(app)
            .delete('/producers')
    })
})
