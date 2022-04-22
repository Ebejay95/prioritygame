import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})
export class TicketBoardComponent implements OnInit {

  constructor(private ticketService: TicketService, private router:Router) { }
  ticketSubscription!: Subscription
  tickets!:Ticket[]
  newTickets:Ticket[] = []
  processedTickets!:Ticket[]
  ticketRows:[Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[]] = [[],[],[],[],[],[],[],[],[],[]]
  visitedTicketRow!:number
  draggedTicket!:Ticket

  ticketsChanged = new Subject<Ticket[]>()
  ngOnInit(): void {
    
    this.ticketSubscription = this.ticketService.getAllTickets().subscribe(
      (tickets:any) => {
        
        // provide tickets for ticketboard
        this.tickets = tickets

        // filter new tickets
        this.newTickets = this.tickets.filter(ticket => ticket.impact === null)
        
        // filter processed tickets
        this.processedTickets = this.tickets.filter(ticket => ticket.impact)
        this.spreadProccessedTicketsOnRows(this.processedTickets)
      }
    );
  }

  onEditTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.router.navigate(['ticket/edit/' + ticket._id.toString()])
    this.ticketsChanged.next(this.tickets.slice())
  }

  onDeleteTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.ticketService.deleteTicket(ticket._id)
    this.ticketsChanged.next(this.tickets.slice())
  }

  onDragStart(ticket:Ticket){
    this.draggedTicket = ticket
  }

  onDragOver(event: Event){
    if (event.target instanceof Element) {
      const rowId = event.target.getAttribute('data-row-id')
      if(rowId !== null){
        this.visitedTicketRow = parseInt(rowId)
      }
    }
  }

  onDragEnd(){
    this.moveTicket(this.draggedTicket, this.visitedTicketRow)
    this.ticketsChanged.next(this.tickets.slice())
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe()
  }

  spreadProccessedTicketsOnRows(processedTickets:Ticket[]){
    this.processedTickets.forEach(
      ticket => {
        const rowIndex = ticket.impact - 1;
        this.ticketRows[rowIndex].push(ticket);
      }
    )
  }

  moveTicket(ticket:Ticket, row:number){
    if(ticket && row){
      this.ticketService.setTicketImpact(ticket, row)
    }
  }
}
