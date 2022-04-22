import { Ticket } from "./ticket.model"

export class Column {
    constructor(
        public name: string,
        public tickets: Ticket[]
    ){}
}