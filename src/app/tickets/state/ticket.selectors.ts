import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ticketAdapter, TicketState } from "./ticket.reducers";

const ticketFeatureSelector = createFeatureSelector<TicketState>('tickets')

export const getTickets = createSelector(
    ticketFeatureSelector,
    ticketAdapter.getSelectors().selectAll
)

export const getLoading = createSelector(
    ticketFeatureSelector,
    (state) => state.loading
)

export const getError = createSelector(
    ticketFeatureSelector,
    (state) => state.error
)