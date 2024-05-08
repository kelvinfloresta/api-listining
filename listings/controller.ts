import { Request, Response } from "express";
import { CreateInput, IDatabase } from "./interface";


export class Controller {
    constructor(private readonly database: IDatabase) {}

    list (_: Request, res: Response) {
        res.json(this.database.list())
    }

    create(req: Request<never, string, CreateInput>, res: Response) {
        /**
         * In a real world scenario you would have a validation library to validate
         */
        if (!req.body.title) {
            return res.status(400).send("Title is required")
        }

        /**
         * A price should not be 0 as well
         */
        if (!req.body.price) {
            return res.status(400).send("Price is required")
        }

        if (!req.body.description) {
            return res.status(400).send("Description is required")
        }

        const id = this.database.create(req.body);
        res.status(201).send(id)
    }

    delete(req: Request<{ id: string }>, res: Response)  {
        const deleted = this.database.delete(req.params.id)
        if (deleted) {
            return res.sendStatus(204)
        }

        res.sendStatus(404)
    }
}