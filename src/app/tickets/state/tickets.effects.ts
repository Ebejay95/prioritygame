import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Ticket } from "src/app/models/ticket.model";

import { Injectable } from "@angular/core";
import { getAllTickets, getAllTicketsSuccess, getTicket } from "./tickets.actions";

@Injectable()
export class TicketEffects {
    getTicket$ = createEffect(()  => this.actions$.pipe(
        ofType(getTicket),
        //map((ticketId: getTicket) => {
            //return this.http.get<Ticket>('https://prioritygame.herokuapp.com/tickets/' + ticketId)
            //.pipe(
            //    map((ticket:Ticket) => {
            //    return of(new TicketActions.GetTicketSuccess({ticket: ticket}))
            //    }),
            //    catchError((error:any) => {
            //        return of()
            //    })
            //)
        //})
    ))

    getAllTickets = this.actions$.pipe(
        ofType(getAllTickets),
        switchMap(()=>{
            console.log('effect: getAllTickets')
            return this.http.get<Ticket[]>('https://prioritygame.herokuapp.com/tickets').pipe(
                map(tickets => {
                    console.log(tickets)
                    return getAllTicketsSuccess({tickets})
                }),
                catchError(error => {
                  return of();
                })
            )
        })
    )
    constructor(private actions$: Actions, private http: HttpClient) {}
}