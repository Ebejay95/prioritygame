import { Component, OnInit, OnDestroy} from '@angular/core';
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
  tickets!:Ticket[]
  newTickets:Ticket[] = []
  processedTickets!:Ticket[]
  ticketRows:[Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[], Ticket[]] = [[],[],[],[],[],[],[],[],[],[]]
  visitedTicketRow!:number
  draggedTicket!:Ticket
  ticketSubscription!:Subscription

  ngOnInit(): void {
    
    this.ticketService.getAllTickets()
    this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
       (tickets:any) => {
        this.spreadProccessedTicketsOnRows(tickets)
       },
       error => {
         console.log(error)
       }
    )
  }

  onEditTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.router.navigate(['ticket/edit/' + ticket._id.toString()])
  }

  onDeleteTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.ticketService.deleteTicket(ticket._id)
    this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
      (tickets:any) => {
        this.spreadProccessedTicketsOnRows(tickets)
      },
      error => {
        console.log(error)
      }
    )
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
  }

  spreadProccessedTicketsOnRows(tickets:Ticket[]){
    // provide tickets for ticketboard
    this.tickets = tickets

    //reset ticketRows
    this.ticketRows = [[],[],[],[],[],[],[],[],[],[]]
    
    // filter new tickets
    this.newTickets = this.tickets.filter(ticket => ticket.impact === 0)
    
    // filter processed tickets
    this.processedTickets = this.tickets.filter(ticket => ticket.impact)
    this.processedTickets.forEach(
      ticket => {
        const rowIndex = ticket.impact - 1;
        this.ticketRows[rowIndex].push(ticket);
      }
    )
  }

  moveTicket(ticket:Ticket, row:number){
    // send value to backend for updates
    this.ticketService.setTicketImpact(ticket, row)
  }
  
  onResetImpactTicket(ticket:Ticket){
    this.moveTicket(ticket, 0)
  }

  ngOnDestroy(){
    if(this.ticketSubscription)
    this.ticketSubscription.unsubscribe()
  }
}
