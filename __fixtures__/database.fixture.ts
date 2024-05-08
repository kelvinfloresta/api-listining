import { database } from "../listings/dependencies-injection";

export function cleanTestDatabase() {
    database.cleanDatabase()
}