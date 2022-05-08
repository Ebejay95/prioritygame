import { createReducer, on } from '@ngrx/store';

import { getTicket, getAllTickets, getAllTicketsSuccess, addTicket, editTicket, deleteTicket } from './tickets.actions';
import { Ticket } from 'src/app/models/ticket.model';

export const initialState:Ticket[] = [];

export const ticketReducer = createReducer(
  initialState,
  on(getTicket, (state, { _id }) => state),
  on(getAllTickets, (state) => {console.log('action: getAllTickets'); return state}),
  on(getAllTicketsSuccess, (state) => {console.log('action: getAllTicketsSuccess'); return state}),
  on(addTicket, (state, { title, desc }) => state),
  on(editTicket, (state, { _id, title, desc, impact }) => state),
  on(deleteTicket, (state, { _id }) => state)
);