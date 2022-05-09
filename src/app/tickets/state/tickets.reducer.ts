import { createReducer, on } from '@ngrx/store';

import { getAllTicketsSuccess } from './tickets.actions';

const initialState = {};

export const ticketReducer = createReducer(
  initialState,
  on(getAllTicketsSuccess, (state, {tickets}) =>  tickets.reduce((state, ticket) => ({
    ...state,
    [ticket._id]: ticket
  }), {})),
);