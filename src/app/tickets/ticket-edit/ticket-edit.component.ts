import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  editing:boolean = false;
  editedTicket!:any 
  ticketForm!:FormGroup
  ticketChanged!:Subscription

  constructor(private route:ActivatedRoute, private ticketService:TicketService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if(params['id']){
          this.editing = true;
          this.ticketChanged = this.ticketService.getTicket(params['id']).subscribe(
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
    if(this.ticketForm.valid){
      const formData = this.ticketForm.value;
      if(this.editing){
        this.ticketService.editTicket(this.editedTicket.id,formData.title,formData.desc,this.editedTicket.impact)
      } else {
        this.ticketService.addTicket(formData.title,formData.desc,0)
      }
    }
  }
}
