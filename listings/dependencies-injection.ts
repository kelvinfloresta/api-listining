import { Controller } from "./controller";
import { Database } from "./database";
import { IDatabase } from "./interface";
import { Route } from "./route";

export const database: IDatabase = new Database()
export const controller = new Controller(database)
export const route = Route(controller)