import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TicketBoardComponent } from './tickets/ticket-board/ticket-board.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/ticket-board', pathMatch: 'full' },
  { path: 'ticket-board', component: TicketBoardComponent},
  { path: 'ticket', children: [
    { path: 'edit/:id', component: TicketEditComponent},
    { path: 'new', component: TicketEditComponent},
  ]},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
