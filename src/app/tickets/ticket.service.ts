import { Injectable } from "@angular/core";
import { Ticket } from "./ticket.model";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class TicketService {

    constructor(private http:HttpClient){}

    ticketsChanged = new Subject<Ticket[]>()

    getTicket(ticketId:string){

        return this.http.get('https://prioritygame.herokuapp.com/tickets/' + ticketId)

    }

    getAllTickets():Observable<Object>{

        // provide observable
        return this.http.get('https://prioritygame.herokuapp.com/tickets')

    }

    addTicket(title:string, desc:string, impact:number){
        
        // format data
        let body = {
            title: title, 
            desc: desc
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/add', body).subscribe(
            (res:any) => {
                console.log(res);
            }
        )
        
    }

    editTicket(id:string, title:string, desc:string, impact:number){
        
        // format data
        let body = {
            id: id,
            title: title, 
            desc: desc,
            impact: impact
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/edit', body).subscribe(
            (res:any) => {
                console.log(res);
            }
        )
        
    }

}