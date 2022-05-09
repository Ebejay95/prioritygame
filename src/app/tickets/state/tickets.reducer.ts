import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';

import { getAllTicketsSuccess } from './tickets.actions';

const initialTickets:Ticket[] = [];

const initialState = { tickets: initialTickets };

export const ticketReducer = createReducer(
  initialState,
  on(getAllTicketsSuccess, (state, {tickets}) =>  {return {...state, tickets: tickets}}),
);