import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
 
 
export const getTicket = createAction(
  '[Tickets] Get Ticket',
  props<{ _id: string }>()
);
export const getTicketSucces = createAction(
  '[Tickets] Get Ticket Success'
);
export const getTicketError = createAction(
  '[Tickets] Get Ticket Error'
);


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

 
export const addTicket = createAction(
  '[Tickets] Add Ticket',
  props<{ title: string, desc: string }>()
);
 
export const editTicket = createAction(
  '[Tickets] Edit Ticket',
  props<{ _id: string, title: string, desc: string, impact: number }>()
);
 
export const deleteTicket = createAction(
  '[Tickets] Delete Ticket',
  props<{ _id: string }>()
);