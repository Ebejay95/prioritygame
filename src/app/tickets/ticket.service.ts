import { Injectable } from "@angular/core";
import { Ticket } from "./ticket.model";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class TicketService {

    constructor(private http:HttpClient){}

    getTicket(id:number){
        return new Ticket('Test', 'das ist ein Test', 4)
    }

    addTicket(title:string, desc:string, impact:number){
        
        // format data
        const ticket = {
            title: title,
            desc: desc,
            impact: impact,
        }

        // send request
        this.http.post('https://prioritygame.herokuapp.com/tickets/add', ticket).subscribe(
            (res) => {
                console.log(res)
            }
        );
        
    }
}