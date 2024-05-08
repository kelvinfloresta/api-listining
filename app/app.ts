import express from 'express'

export class App {
    public readonly server: express.Application

    constructor(private readonly listingRoute : express.Router) {
        this.server = express()
            .use(express.json())
            .use("/listings", this.listingRoute)
    }

}
