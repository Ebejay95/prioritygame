import { createSelector } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';

export interface AppState {
    tickets: Ticket[];
}
 
export const selectTickets = (state: AppState) => state.tickets;
 