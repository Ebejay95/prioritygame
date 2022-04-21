import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  editing:boolean = false;
  editedTicket!:Ticket;

  ticketTitle!:string
  ticketDesc!:string
  ticketImpact!:number

  ticketForm:FormGroup = new FormGroup({
    title: new FormControl(this.ticketTitle, [Validators.required]),
    desc: new FormControl(this.ticketDesc, [Validators.required])
  })

  constructor(private route:ActivatedRoute, private ticketService:TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if(params['id']){
          this.editing = true;
          this.editedTicket = this.ticketService.getTicket(params['id'])
        }
      }
    )
  }

  onSubmit(){
    const formData = this.ticketForm.value;
    this.ticketService.addTicket(formData.title,formData.desc,0)
  }
}
