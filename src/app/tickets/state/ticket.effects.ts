import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, of, map } from "rxjs";
import { TicketService } from "../../services/ticket.service";
import { AddTicket, AddTicketFailure, AddTicketSuccess, DeleteTicket, DeleteTicketFailure, DeleteTicketSuccess, GetTickets, GetTicketsFailure, GetTicketsSuccess, TicketActionTypes, UpdateTicket, UpdateTicketFailure, UpdateTicketSuccess } from "./ticket.actions";

@Injectable()
export class TicketEffects {
    constructor(private ticketService: TicketService, private actions:Actions) {}

    public getTickets = createEffect(() => {
        return this.actions.pipe(
            ofType<GetTickets>(TicketActionTypes.GET_TICKET),
            mergeMap(() => {
                return this.ticketService.getAllTickets().pipe(
                    map((tickets) => new GetTicketsSuccess({tickets})),
                    catchError(() => of(new GetTicketsFailure()))
                )
            })
        )
    })

    public addTicket = createEffect(() => {
        return this.actions.pipe(
            ofType<AddTicket>(TicketActionTypes.ADD_TICKET),
            mergeMap((action) => {
                return this.ticketService.addTicket(action.payload.title, action.payload.desc).pipe(
                    map((tickets) => new AddTicketSuccess({tickets})),
                    catchError(() => of(new AddTicketFailure()))
                )
            })
        )
    })

    public updateTicket = createEffect(() => {
        return this.actions.pipe(
            ofType<UpdateTicket>(TicketActionTypes.UPDATE_TICKET),
            mergeMap((action) => {
                return this.ticketService.editTicket(action.payload._id, action.payload.title, action.payload.desc, action.payload.impact).pipe(
                    map((tickets) => new UpdateTicketSuccess({tickets})),
                    catchError(() => of(new UpdateTicketFailure()))
                )
            })
        )
    })

    public deleteTicket = createEffect(() => {
        return this.actions.pipe(
            ofType<DeleteTicket>(TicketActionTypes.DELETE_TICKET),
            mergeMap((action) => {
                return this.ticketService.deleteTicket(action.payload._id).pipe(
                    map((tickets) => new DeleteTicketSuccess({tickets})),
                    catchError(() => of(new DeleteTicketFailure()))
                )
            })
        )
    })
}