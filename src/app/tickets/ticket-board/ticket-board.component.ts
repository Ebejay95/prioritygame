import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from '../board.model';
import { Column } from '../column.model';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})
export class TicketBoardComponent implements OnInit{

  board: Board = new Board('Inpact Board',[])

  constructor(private ticketService: TicketService, private router:Router) { }

  ticketSubscription!:Subscription
  numberOfColumns:number = 10

  
  ngOnInit(): void {
    
    this.ticketService.getAllTickets()
    this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
      (tickets:any) => {
        this.buildBoard(tickets)
      },
      error => {
        console.log(error)
      }
    )

  }
  
  buildBoard(tickets:Ticket[]){
    const newTickets = tickets.filter((ticket:Ticket) => ticket.impact === 0)
    let dynamicColumns:Column[] = [
      new Column('NEU', newTickets)
    ]
    for(let colIndex = 0 ; colIndex < this.numberOfColumns; colIndex++){
      let ticketsOfColumn:Ticket[] = []
      tickets.forEach((ticket:Ticket) => {
        if(ticket.impact === colIndex+1){
          ticketsOfColumn.push(ticket)
        }
      })
      dynamicColumns.push(new Column((colIndex+1).toString(), ticketsOfColumn))
    }
    this.board.columns = dynamicColumns
  }

  onEditTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.router.navigate(['ticket/edit/' + ticket._id.toString()])
  }
  
  onDeleteTicket(ticket:any){ // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.ticketService.deleteTicket(ticket._id)
    this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
      (tickets:any) => {
        this.buildBoard(tickets)
      },
      error => {
        console.log(error)
      }
    )
  }
  
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    // send drop to db
    let droppedTicket = event.container.data[0]
    let newImpact = event.container.element.nativeElement.getAttribute('data-target')
    this.moveTicket(droppedTicket, newImpact)
  }
  
  moveTicket(ticket:Ticket, impact:number){
    this.ticketService.setTicketImpact(ticket, impact)
  }
  
  ngOnDestroy(){
    if(this.ticketSubscription)
    this.ticketSubscription.unsubscribe()
  }
}
