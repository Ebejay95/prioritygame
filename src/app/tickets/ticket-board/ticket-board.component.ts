import { Component, OnInit} from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Ticket } from '../../models/ticket.model'
import { TicketService } from '../../services/ticket.service'
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { Board } from '../../models/board.model'
import { Column } from '../../models/column.model'

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})

export class TicketBoardComponent implements OnInit{

  // create a board
  board: Board = new Board('Impact Board',[])

  // for dynamic creation of the boards columns
  numberOfColumns:number = 10

  // subscription to ticket service for backend interaction
  ticketSubscription!:Subscription
  constructor(private ticketService: TicketService, private router:Router) { }


  /**
  * Oninit - Lifcycle funtion
  * Get tickets, build board, and populate the tickets by impact
  * @void
  */
  ngOnInit(): void {
    this.ticketService.getAllTickets()
    this.ticketSubscription = this.ticketService.ticketsChanged
      .subscribe(
        (tickets:Ticket[]) => { this.buildBoard(tickets) },
        error => { console.log(error) }
      )
  }
  

  /**
  * Build the board from tickets and their impacts
  * @param    {Ticket[]}    tickets  array of available tickets
  * @return   {Observable}  get from HttpClient
  */
  buildBoard(tickets:Ticket[]): void {

    // get all tickets without impact (new tickets)
    const newTickets = tickets.filter((ticket:Ticket) => ticket.impact === 0)

    // prepopulate board with the new tickets column
    let dynamicColumns:Column[] = [
      new Column('NEU', newTickets)
    ]

    // dnamically add the default columns and their tickets by impact
    for(let colIndex = 0 ; colIndex < this.numberOfColumns ; colIndex++){
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


  /**
  * Navigate to edit form
  * @param    {Ticket}     ticket  (Ticket) interference beacause of _id (mongoDB - not in model)
  * @void
  */
  onEditTicket(ticket:Ticket): void { // Hier sei angemerkt, dass ich den Type für Typescript mit der uniquid von mongo nicht im Model eingebaut habe und das deshalb hier sonst einen Error wirft. Ehrlich gesagt wusste ich keinen anderen Workaround...
    this.router.navigate(['ticket/edit/' + ticket._id.toString()])
  }
  

  /**
  * Request ticket delete via ticket service and popupate results
  * @param    {Ticket[]}     tickets
  * @void
  */
  onDeleteTicket(ticket:Ticket): void { 
    this.ticketService.deleteTicket(ticket._id)
    this.ticketSubscription = this.ticketService.ticketsChanged
      .subscribe(
        (tickets:Ticket[]) => { this.buildBoard(tickets) },
        error => { console.log(error) }
      )
  }


  /**
  * cdkDrag => ticket of board column
  * Register drag, provide animation und functionality via cdk and send the data change to 
  * mongoDB via ticket service
  * @void
  */
  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
    }

    // send drop to db
    let droppedTicketId = event.item.element.nativeElement.getAttribute('data-id')
    let newImpact = event.container.element.nativeElement.getAttribute('data-target')
    this.ticketService.setTicketImpact(droppedTicketId, newImpact)
  }


  /**
  * OnDestroy - Lifcycle funtion
  * Unsubscribe Subscripton for performance
  * @void
  */
  ngOnDestroy(): void {
    if(this.ticketSubscription)
    this.ticketSubscription.unsubscribe()
  }
}
