import { Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Subject, map, Observable } from 'rxjs'
import { Ticket } from '../../models/ticket.model'
import { TicketService } from '../../services/ticket.service'
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model'
import { Column } from '../../models/column.model'

import { Store } from '@ngrx/store'
import { TicketState } from 'src/app/tickets/state/ticket.reducers'
import { GetTickets } from 'src/app/tickets/state/ticket.actions'
import { getTickets } from 'src/app/tickets/state/ticket.selectors'

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})

export class TicketBoardComponent implements OnInit{


  // create a board
  //board$ = this.tickets$.pipe(map(this.buildBoard))

  constructor(
    public tickets: Observable<Ticket[]>,
    private ticketStore: Store<TicketState>,
    private ticketService: TicketService,
    private router:Router,
  ) { }


  /**
  * Oninit - Lifcycle funtion
  * Get tickets, build board, and populate the tickets by impact
  * @void
  */
  ngOnInit(): void {
    this.ticketStore.dispatch(new GetTickets())
    //this.ticketService.getAllTickets().subscribe(tickets => {
    //  this.tickets$.next(tickets)
    //})
    this.tickets = this.ticketStore.select(getTickets)
    console.log(this.tickets)
  }
  

  /**
  * Build the board from tickets and their impacts
  * @param    {Ticket[]}    tickets  array of available tickets
  * @return   {Observable}  get from HttpClient
  */
  buildBoard(tickets: Ticket[]): Board {
    let columns: Column[] = []

    // dnamically add the default columns and their tickets by impact
    for (let colIndex = 0 ; colIndex < 11 ; colIndex++) {
      const ticketsOfColumn:Ticket[] = []
      tickets.forEach((ticket:Ticket) => {
        if (ticket.impact === colIndex) {
          ticketsOfColumn.push(ticket)
        }
      })      
      columns.push({
        name: `${colIndex}`,
        tickets: ticketsOfColumn
      })
    }

    // if no new tickets with impact 0, remove 0-th col
    if (columns[0].tickets.length === 0) {
      columns = columns.splice(1)
    } else {
      // otherwise rename 0-th col to new
      columns[0].name = 'NEU'
    }

    return {
      name: 'Impact Board',
      columns
    }
  
  }


  /**
  * Request ticket delete via ticket service and popupate results
  * @param    {Ticket}     ticket
  * @void
  */
  onDeleteTicket(ticket:Ticket): void {
    //this.ticketService.deleteTicket(ticket._id)
    //.subscribe((tickets) => {
    //  this.tickets$.next(tickets)
    //})
  }


  /**
  * cdkDrag => ticket of board column
  * Register drag, provide animation und functionality via cdk and send the data change to
  * mongoDB via ticket service
  * @void
  */
  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tickets, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.tickets,
        event.container.data.tickets,
        event.previousIndex,
        event.currentIndex,
      )
    }

    // send drop to db
    const droppedTicketId = event.item.data?.ticketId
    const newImpact = event.container.data?.name
    if (droppedTicketId && newImpact) {
      this.ticketService.setTicketImpact(droppedTicketId, Number(newImpact))
        .subscribe(tickets => this.tickets$.next(tickets))
    }
  }
}
