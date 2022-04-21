import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css']
})
export class TicketBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onDragStart(){
    console.log('drag start');
  }

  onDragEnd(){
    console.log('drag end');
  }

  onDragOver(){
    console.log('drag over');
  }
}
