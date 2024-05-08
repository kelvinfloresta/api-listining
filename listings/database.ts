import { v4 as uuid } from 'uuid';
import { CreateInput, IDatabase, Listing } from "./interface";

export class Database implements IDatabase {
    private store: Listing[] = []

    list(): readonly Listing[] {
       return this.store
    }

    delete(id: string): boolean {
        const index = this.store.findIndex(listing => listing.id === id)
        
        if (index === -1) {
            return false
        }

        /**
         * Splice has more performance than slice or a filter operation,
         * as we want to mutate the store it's better to use splice
         */
        this.store.splice(index, 1)
        
        return true
    }

    create(input: CreateInput) {
        const id = uuid()
        this.store.push({ ...input, id })
        return id
    }

    /**
     * In a real world scenario you won't need it since you can directly create a query to delete all the data
     */
    cleanDatabase() {
        this.store = []
    }
}