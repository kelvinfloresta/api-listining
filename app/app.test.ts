
import { mock } from 'jest-mock-extended'
import request from 'supertest'
import { cleanTestDatabase } from '../__fixtures__/database.fixture'
import { Controller } from '../listings/controller'
import { Database } from '../listings/database'
import { IDatabase } from '../listings/interface'
import { Route } from '../listings/route'
import { App } from './app'

beforeEach(() => {
    cleanTestDatabase()
})

/**
 * SUT means **System Under Test**
 * @link https://en.wikipedia.org/wiki/System_under_test
 */
function makeSUT(database: IDatabase = new Database()) {
    const controller = new Controller(database)
    const route = Route(controller)
    const { server } =  new App(route)
    return server
}

describe("Listing", () => {
    it("should be able to retrive a created listing", async () => {
        const server = makeSUT()

        const newItem = {
            title: "new item",
            price: 100,
            description: "new description"
        }

        const { text: id } = await request(server).post("/listings").send(newItem).expect(201)
        const { body } = await request(server).get("/listings").expect(200)
        expect(body).toEqual([{ id, ...newItem }])

    })

    it("should be able to delete a listing", async () => {
        const server = makeSUT()
        const newItem = {
            title: "new item",
            price: 100,
            description: "new description"
        }

        const { text: id } = await request(server).post("/listings").send(newItem).expect(201)

        await request(server).delete(`/listings/${id}`).expect(204)
            
        await request(server).get("/listings").expect(200).expect([])
    })

    it("should return 404 when trying to delete a non-existing listing", async () => {
        const server = makeSUT()
        await request(server).delete("/listings/123").expect(404)
    })

    it("should return 404 when id is not provided", async () => {
        const server = makeSUT()
        await request(server).delete("/listings/").expect(404)
    })

    it("should return 500 and not crash the app if an error occurs", async () => {
        const throwError = () => { throw new Error("Something went wrong") }
        const databaseMock = mock<IDatabase>({
            list: throwError,
            delete: throwError,
            create: throwError
        })

        const server = makeSUT(databaseMock)

        await request(server).get("/listings").expect(500)
        await request(server).delete("/listings/123").expect(500)
        await request(server).post("/listings").send({
            title: "new item",
            price: 100,
            description: "new description"
        }).expect(500)
    })
})