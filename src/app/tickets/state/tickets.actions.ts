import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';

// getAllTickets
export const getAllTickets = createAction(
  '[Tickets] Get all Tickets'
);
export const getAllTicketsSuccess = createAction(
  '[Tickets] Get Ticket Success',
  props<{ tickets: Ticket[] }>()
);
export const getAllTicketsError = createAction(
  '[Tickets] Get Ticket Error'
);