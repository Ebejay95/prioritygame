import { Ticket } from "./ticket.model"

export interface Column {
    name: string,
    tickets: Ticket[]
}