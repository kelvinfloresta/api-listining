export interface Listing  {
    readonly id: string
    readonly title: string
    readonly price: number
    readonly description: string
}

export interface CreateInput extends Pick<Listing, "title" | "price" | "description"> {}

export interface IDatabase {
    create(input: CreateInput): string
    list(): readonly Listing[]
    delete(id: string): boolean
    cleanDatabase(): void
}
