import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Ticket } from '../../models/ticket.model'
import { TicketService } from '../../services/ticket.service'

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})

export class TicketEditComponent implements OnInit {

  // general ticket array for component
  tickets:Ticket[] = []

  // is form for a new or existing (editing=true) ticket
  editing:boolean = false

  // the edited ticket is only set if this.editing=true
  editedTicket!:any

  // reactive form group for angular form implementation
  ticketForm!:FormGroup

  // subscription to ticket service for backend interaction
  ticketSubscription!:Subscription

  constructor(
    private route:ActivatedRoute,
    private ticketService:TicketService,
    private router:Router
  ) { }

  /**
  * Oninit - Lifcycle funtion
  * Setup form und populate it with ticket data if called in edit mode by route
  * @void
  */
  ngOnInit(): void {

    this.route.params.subscribe( params => {

      // is in edit mode
      if(params['id']){
        this.editing = true
        this.ticketService.getTicket(params['id']).subscribe(
          (ticket:any) => {
            this.ticketForm.setValue({'title': ticket.title, 'desc': ticket.desc})
            this.editedTicket = ticket
          }
        )
      }
  
    })

    // provide the form at any time
    this.ticketForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required])
    })

  }

  /**
  * ngSubmit => this.ticketForm
  * Execute editing or creating of a ticket via ticket service and popupate results
  * Navigate to board
  * @next {Ticket[]} updated tickets from express backend server
  */
  onSubmit(): void {
    if(this.ticketForm.valid){
      const formData = this.ticketForm.value
      if(this.editing){

        // edit ticket by forms data and popupate results
        this.ticketService.editTicket(this.editedTicket._id,formData.title,formData.desc,this.editedTicket.impact)
        this.ticketSubscription = this.ticketService.ticketsChanged
          .subscribe(
            tickets => { this.tickets = tickets },
            error => { console.log(error) }
          )

      } else {

        // create ticket by forms data and popupate results
        this.ticketService.addTicket(formData.title,formData.desc)
        this.ticketSubscription = this.ticketService.ticketsChanged
          .subscribe(
            tickets => { this.tickets = tickets },
            error => { console.log(error) }
          )

      }

      // navigate to board
      this.router.navigate(['../'])

    }
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
