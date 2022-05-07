import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Ticket } from "../../models/ticket.model";
import { TicketActions, TicketActionTypes } from "./ticket.actions";

export interface TicketState extends EntityState<Ticket> {
    loading: boolean
    error: string
}

export const ticketAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>()

const ticketDefaultState: TicketState = {
    ids: [],
    entities: {},
    loading: false,
    error: ''
}

export const initialState: TicketState = ticketAdapter.getInitialState(ticketDefaultState)

export function ticketReducer(
    state: TicketState = initialState,
    action: TicketActions
):TicketState {
    switch(action.type) {
        case TicketActionTypes.GET_TICKET: {
            return { ...state, loading: true }
        }
        case TicketActionTypes.GET_TICKET_SUCCESS: {
            return ticketAdapter.setAll(action.payload.tickets, {
                ...state,
                loading: false
            })
        }
        case TicketActionTypes.GET_TICKET_FAILURE: {
            return { ...state, loading: false, error: 'Etwas ist schiefgelaufen' }
        }
        case TicketActionTypes.ADD_TICKET: {
            return { ...state, loading: true }
        }
        case TicketActionTypes.ADD_TICKET_SUCCESS: {
            return { ...state, loading: false }
        }
        case TicketActionTypes.ADD_TICKET_FAILURE: {
            return { ...state, loading: false, error: 'Etwas ist schiefgelaufen' }
        }
        case TicketActionTypes.UPDATE_TICKET: {
            return { ...state, loading: true }
        }
        case TicketActionTypes.UPDATE_TICKET_SUCCESS: {
            return { ...state, loading: false }
        }
        case TicketActionTypes.UPDATE_TICKET_FAILURE: {
            return { ...state, loading: false, error: 'Etwas ist schiefgelaufen' }
        }
        case TicketActionTypes.DELETE_TICKET: {
            return { ...state, loading: true }
        }
        case TicketActionTypes.DELETE_TICKET_SUCCESS: {
            return { ...state, loading: false }
        }
        case TicketActionTypes.DELETE_TICKET_FAILURE: {
            return { ...state, loading: false, error: 'Etwas ist schiefgelaufen' }
        }
        default:
            return state
    }
}