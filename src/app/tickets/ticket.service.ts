import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Ticket } from "./ticket.model";

@Injectable({providedIn: 'root'})

export class TicketService {

    constructor(private http:HttpClient){}
    ticketsChanged = new Subject<Ticket[]>()
    tickets:Ticket[] = []

    ngOnInit(){
        
    }

    getTicket(ticketId:string){

        return this.http.get('https://prioritygame.herokuapp.com/tickets/' + ticketId)

    }

    getAllTickets(){

        this.http.get('https://prioritygame.herokuapp.com/tickets').subscribe(
            (tickets:any) => {
               this.tickets = tickets
               this.ticketsChanged.next(this.tickets.slice()) 
            },
            error => {
              console.log(error)
            }
        )

    }

    addTicket(title:string, desc:string, impact:number){
        
        // format data
        let body = {
            title: title, 
            desc: desc
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/add', body).subscribe(
            (tickets:any) => {
               this.tickets = tickets
               this.ticketsChanged.next(this.tickets.slice()) 
            },
            error => {
              console.log(error)
            }
        )
        
    }

    editTicket(_id:string, title:string, desc:string, impact:number){
        
        // format data
        let body = {
            _id: _id,
            title: title, 
            desc: desc,
            impact: impact
        }
    
        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/edit', body).subscribe(
            (tickets:any) => {
               this.tickets = tickets
               this.ticketsChanged.next(this.tickets.slice()) 
            },
            error => {
              console.log(error)
            }
        )
        
    }

    deleteTicket(_id:string){
        
        // format data
        let body = {
            _id: _id
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/delete', body).subscribe(
            (tickets:any) => {
               this.tickets = tickets
               this.ticketsChanged.next(this.tickets.slice()) 
            },
            error => {
              console.log(error)
            }
        )
        
    }

    setTicketImpact(ticket:any, impact:number){

        // format data
        let body = {
            _id: ticket._id,
            impact: impact
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/change-impact', body).subscribe(
            (tickets:any) => {
                console.log(tickets)
               this.tickets = tickets
               this.ticketsChanged.next(this.tickets.slice()) 
            },
            error => {
              console.log(error)
            }
        )
    }

}