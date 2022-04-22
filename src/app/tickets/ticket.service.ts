import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class TicketService {

    constructor(private http:HttpClient){}

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
            (res) => {
                console.log(res)
            }
        )
        
    }

    editTicket(id:string, title:string, desc:string, impact:number):Observable<Object>{
        
        // format data
        let body = {
            id: id,
            title: title, 
            desc: desc,
            impact: impact
        }

        // send request
        return this.http.post('https://prioritygame.herokuapp.com/tickets/edit', body)
        
    }

    deleteTicket(id:string){
        
        // format data
        let body = {
            id: id
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/delete', body).subscribe(
            (res:any) => {
                console.log(res);
            }
        )
        
    }

    setTicketImpact(ticket:any, impact:number){
        this.editTicket(ticket._id, ticket.title, ticket.desc, impact)

    }

}