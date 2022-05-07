import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
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
  editedTicket!:Ticket

  // reactive form group for angular form implementation
  ticketForm!:FormGroup

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
      if (params['id']){
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
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      desc: new FormControl('', [Validators.required, Validators.minLength(10)])
    })

  }

  /**
  * ngSubmit => this.ticketForm
  * Execute editing or creating of a ticket via ticket service and popupate results
  * Navigate to board
  * @next {Ticket[]} updated tickets from express backend server
  */
  onSubmit(): void {
    if (this.ticketForm.valid){
      const formData = this.ticketForm.value
      if (this.editing){

        // edit ticket by forms data and popupate results
        this.ticketService
          .editTicket(this.editedTicket._id,formData.title,formData.desc,this.editedTicket.impact)
          .subscribe(async (tickets) => {
            // navigate to board
            await this.router.navigate(['../'])
          },
          (error) => { console.error(error) }
        )
      } else {
        // create ticket by forms data and popupate results
        this.ticketService.addTicket(formData.title,formData.desc)
        .subscribe(async (tickets) => {
            await this.router.navigate(['../'])
          },
          (error) => { console.log(error) }
        )
      }
    }
  }
}
