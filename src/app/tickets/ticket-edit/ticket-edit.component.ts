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
  editedTicket!:Ticket;

  ticketTitle!:string
  ticketDesc!:string
  ticketImpact!:number
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
              this.editedTicket = ticket
            }
          )
          this.ticketTitle = this.editedTicket.title
          this.ticketDesc = this.editedTicket.desc
        }
      }
    )
    this.ticketForm = new FormGroup({
      title: new FormControl(this.ticketTitle, [Validators.required]),
      desc: new FormControl(this.ticketDesc, [Validators.required])
    })
  }

  onSubmit(){
    if(this.ticketForm.valid){
      const formData = this.ticketForm.value;
      this.ticketService.addTicket(formData.title,formData.desc,0)
      this.router.navigate(['../'])
    }
  }
}
