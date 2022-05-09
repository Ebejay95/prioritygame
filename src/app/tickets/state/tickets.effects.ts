import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Ticket } from "src/app/models/ticket.model";

import { Injectable } from "@angular/core";
import { getAllTickets, getAllTicketsError, getAllTicketsSuccess } from "./tickets.actions";
import { TicketService } from "src/app/services/ticket.service";

@Injectable()
export class TicketEffects {
    getAllTickets$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[Tickets] Get all Tickets'),
        switchMap(() => this.ticketService.getAllTickets().pipe(
          map(tickets => getAllTicketsSuccess({tickets})),
          catchError(() => of(getAllTicketsError()))
        ))
      )
    );

    constructor(private actions$: Actions, private http: HttpClient, private ticketService: TicketService) {}
}