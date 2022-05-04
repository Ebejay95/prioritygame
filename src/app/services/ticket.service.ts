import { Injectable } from "@angular/core"
import {HttpClient, HttpResponse} from '@angular/common/http'
import { Observable, Subject } from "rxjs"
import { Ticket } from "../models/ticket.model"

@Injectable({providedIn: 'root'})

export class TicketService {

  // subject to populate services data to any component
  ticketsChanged = new Subject<Ticket[]>()

  // general ticket array for service
  tickets:Ticket[] = []

  constructor(private http:HttpClient) { }

  /**
  * GET - ticket by id
  * Return a observable a component can subscribe to
  * @param    {string}      ticketId   tickets id
  * @return   {Observable}  get from HttpClient
  */
  getTicket(ticketId:string): Observable<Object> {
    return this.http.get('https://prioritygame.herokuapp.com/tickets/' + ticketId)
  }


  /**
  * GET - alltickets
  * @next {Ticket[]}  tickets from express backend server
  */
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('https://prioritygame.herokuapp.com/tickets')
  }


  /**
  * POST - add a ticket
  * @param  {string}  title   tickets title
  * @param  {string}  desc    tickets desc
  * @next {Ticket[]}  updated tickets from express backend server
  */
  addTicket(title:string, desc:string): Observable<Ticket[]> {
    // provide http body for request
    let body = {
        title: title,
        desc: desc
    }

    // send request and provide result data
    return this.http.post<Ticket[]>('https://prioritygame.herokuapp.com/tickets/add', body)
  }


  /**
  * POST - edit a ticket
  * @param  {string}  _id     tickets _id (mongoDB)
  * @param  {string}  title   tickets title
  * @param  {string}  desc    tickets desc
  * @param  {string}  impact  tickets impact
  * @next {Ticket[]}  updated tickets from express backend server
  */
  editTicket(_id:string, title:string, desc:string, impact:number): Observable<Ticket[]> {
    // provide http body for request
    let body = {
      _id: _id,
      title: title,
      desc: desc,
      impact: impact
    }

    // send request and provide result data
    return this.http.post<Ticket[]>('https://prioritygame.herokuapp.com/tickets/edit', body)
  }


  /**
  * POST - delete a ticket
  * @param  {string}  _id     tickets _id (mongoDB)
  * @next {Ticket[]}  updated tickets from express backend server
  */
  deleteTicket(_id:string) {
    // provide http body for request
    let body = {
        _id: _id
    }

    // send request and provide result data
    return this.http.post<Ticket[]>('https://prioritygame.herokuapp.com/tickets/delete', body)
  }


  /**
  * POST - edit a tickets impact
  * @param  {string}     ticketId  (Ticket) interference beacause of _id (mongoDB - not in model)
  * @param  {string}  impact  tickets impact
  * @next {Ticket[]}  updated tickets from express backend server
  */
  setTicketImpact(ticketId:string, impact:number): void {
    // provide http body for request
    let body = {
        _id: ticketId,
        impact: impact
    }

    // send request and provide result data
    this.http.post('https://prioritygame.herokuapp.com/tickets/change-impact', body)
    .subscribe(
      (tickets:any) => {
        this.tickets = tickets
        this.ticketsChanged.next(this.tickets.slice())
      },
      error => { console.log(error) }
    )
  }

}
