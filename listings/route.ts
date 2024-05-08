import { Router } from 'express'
import { Controller } from './controller'

export const Route = (controller: Controller) => Router()
    .post("/", controller.create.bind(controller))
    .get("/", controller.list.bind(controller))
    .delete("/:id", controller.delete.bind(controller))

