import { Action } from "@ngrx/store"
import { Ticket } from "../../models/ticket.model"

export enum TicketActionTypes {

    GET_TICKET = '[GET TICKET]',
    GET_TICKET_SUCCESS = '[GET TICKET] SUCCESS',
    GET_TICKET_FAILURE = '[GET TICKET] FAILURE',

    ADD_TICKET = '[ADD TICKET]',
    ADD_TICKET_SUCCESS = '[ADD TICKET] SUCCESS',
    ADD_TICKET_FAILURE = '[ADD TICKET] FAILURE',

    UPDATE_TICKET = '[UPDATE TICKET]',
    UPDATE_TICKET_SUCCESS = '[UPDATE TICKET] SUCCESS',
    UPDATE_TICKET_FAILURE = '[UPDATE TICKET] FAILURE',

    DELETE_TICKET = '[DELETE TICKET]',
    DELETE_TICKET_SUCCESS = '[DELETE TICKET] SUCCESS',
    DELETE_TICKET_FAILURE = '[DELETE TICKET] FAILURE'

}

export class GetTickets implements Action {
    readonly type = TicketActionTypes.GET_TICKET
}

export class GetTicketsSuccess implements Action {
    readonly type = TicketActionTypes.GET_TICKET_SUCCESS

    constructor(
        public payload: {
            tickets: Ticket[]
        }
    ){}
}

export class GetTicketsFailure implements Action {
    readonly type = TicketActionTypes.GET_TICKET_FAILURE
}


export class AddTicket implements Action {
    readonly type = TicketActionTypes.ADD_TICKET
    constructor(
        public payload: {
            title: string,
            desc: string,
            impact: number
        }
    ){}
}

export class AddTicketSuccess implements Action {
    readonly type = TicketActionTypes.ADD_TICKET_SUCCESS

    constructor(
        public payload: {
            tickets: Ticket[]
        }
    ){}
}

export class AddTicketFailure implements Action {
    readonly type = TicketActionTypes.ADD_TICKET_FAILURE
}



export class UpdateTicket implements Action {
    readonly type = TicketActionTypes.UPDATE_TICKET
    constructor(
        public payload: {
            _id: string,
            title: string,
            desc: string,
            impact: number
        }
    ){}
}

export class UpdateTicketSuccess implements Action {
    readonly type = TicketActionTypes.UPDATE_TICKET_SUCCESS

    constructor(
        public payload: {
            tickets: Ticket[]
        }
    ){}
}

export class UpdateTicketFailure implements Action {
    readonly type = TicketActionTypes.UPDATE_TICKET_FAILURE
}



export class DeleteTicket implements Action {
    readonly type = TicketActionTypes.DELETE_TICKET
    constructor(
        public payload: {
            _id: string
        }
    ){}
}

export class DeleteTicketSuccess implements Action {
    readonly type = TicketActionTypes.DELETE_TICKET_SUCCESS

    constructor(
        public payload: {
            tickets: Ticket[]
        }
    ){}
}

export class DeleteTicketFailure implements Action {
    readonly type = TicketActionTypes.DELETE_TICKET_FAILURE
}

export type TicketActions = 
    | GetTickets
    | GetTicketsSuccess
    | GetTicketsFailure
    | AddTicket
    | AddTicketSuccess
    | AddTicketFailure
    | UpdateTicket
    | UpdateTicketSuccess
    | UpdateTicketFailure
    | DeleteTicket
    | DeleteTicketSuccess
    | DeleteTicketFailure
