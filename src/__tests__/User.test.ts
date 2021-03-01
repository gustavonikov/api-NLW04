import request from 'supertest'
import { getConnection } from 'typeorm'
import server from '../app'

import createConnection from '../database'

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection =  getConnection()

        await connection.dropDatabase()

        await connection.close()
    })

    it('Should be able to create a new user', async () => {
        const response = await request(server).post('/users').send({
            name: 'Example Sample',
            email: 'example@sample.com'
        })

        expect(response.status).toBe(201)
    })

    it('Should not be able to create a user if email exists', async () => {
        const response = await request(server).post('/users').send({
            name: 'Example Sample',
            email: 'example@sample.com'
        })

        expect(response.status).toBe(400)
    })
})
