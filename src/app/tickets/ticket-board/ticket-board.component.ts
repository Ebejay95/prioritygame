import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})
export class TicketBoardComponent implements OnInit {

  constructor(private ticketServices: TicketService, private router:Router) { }
  ticketSubscription!: Subscription
  tickets!:Ticket[]
  newTickets!:Ticket[]
  processedTickets!:Ticket[]

  ngOnInit(): void {
    this.ticketSubscription = this.ticketServices.getAllTickets().subscribe(
      (tickets:any) => {
        
        // provide tickets for ticketboard
        this.tickets = tickets

        // filter new tickets
        this.newTickets = this.tickets.filter(ticket => ticket.impact === null)
        
        // filter processed tickets
        this.processedTickets = this.tickets.filter(ticket => ticket.impact)
      }
    )
  }

  onEditTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.router.navigate(['ticket/edit/' + ticket._id.toString()])
  }

  onDeleteTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.ticketServices.deleteTicket(ticket._id)
  }

  onDragStart(){
    console.log('drag start');
  }

  onDragEnd(){
    console.log('drag end');
  }

  onDragOver(){
    console.log('drag over');
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe()
  }
}
