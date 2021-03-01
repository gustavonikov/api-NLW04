import request from 'supertest'
import { getConnection } from 'typeorm'
import server from '../app'

import createConnection from '../database'

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection =  getConnection()

        await connection.dropDatabase()

        await connection.close()
    })

    it('Should be able to create a new survey', async () => {
        const response = await request(server).post('/surveys').send({
            title: 'Sample Title',
            description: 'A sample survey to be used as a example!'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it('Should be able to show all surveys', async () => {
        await request(server).post('/surveys').send({
            title: 'Sample Title 02',
            description: 'A sample survey to be used as a example 02!'
        })

        const response = await request(server).get('/surveys')

        expect(response.body.length).toBe(2)
    })
})
