import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  @Output() tickets:Ticket[] = []

  editing:boolean = false;
  editedTicket!:any 
  ticketForm!:FormGroup
  ticketSubscription!:Subscription

  constructor(private route:ActivatedRoute, private ticketService:TicketService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if(params['id']){
          this.editing = true;
          this.ticketService.getTicket(params['id']).subscribe(
            (ticket:any) => {
              this.ticketForm.setValue({'title': ticket.title, 'desc': ticket.desc});
              this.editedTicket = ticket
            }
          )
        }
      }
    )
    this.ticketForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    //TODO laden der Route abstimmen mit Observable
    if(this.ticketForm.valid){
      const formData = this.ticketForm.value;
      if(this.editing){
        this.ticketService.editTicket(this.editedTicket._id,formData.title,formData.desc,this.editedTicket.impact)
        this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
          tickets => {
            this.tickets = tickets
          },
          error => {
            console.log(error)
          }
        )
      } else {
        this.ticketService.addTicket(formData.title,formData.desc,0)
        this.ticketSubscription = this.ticketService.ticketsChanged.subscribe(
          tickets => {
            this.tickets = tickets
          },
          error => {
            console.log(error)
          }
        )
      }
      this.router.navigate(['../'])
    }
  }

  ngOnDestroy(){
    if(this.ticketSubscription)
    this.ticketSubscription.unsubscribe()
  }
}
