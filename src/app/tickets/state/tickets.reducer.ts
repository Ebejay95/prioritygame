import { createReducer, on } from '@ngrx/store';

import { getAllTickets, getAllTicketsSuccess, getAllTicketsError } from './tickets.actions';
import { Ticket } from 'src/app/models/ticket.model';

const initialState = {};

export const ticketReducer = createReducer(
  initialState,
  on(getAllTicketsSuccess, (state, {tickets}) =>  tickets.reduce((state, ticket) => ({
    ...state,
    [ticket._id]: ticket
  }), {})),
);