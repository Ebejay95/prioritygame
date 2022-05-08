import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { TicketBoardComponent } from './tickets/ticket-board/ticket-board.component'
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ShortenPipe } from './pipes/shorten.pipe'
import { DragDropModule } from '@angular/cdk/drag-drop'

import { StoreModule } from '@ngrx/store'
import { ticketReducer } from './tickets/state/tickets.reducer'
import { EffectsModule } from '@ngrx/effects'
import { TicketEffects } from './tickets/state/tickets.effects'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TicketBoardComponent,
    TicketEditComponent,
    PageNotFoundComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ tickets: ticketReducer }),
    EffectsModule.forRoot([TicketEffects]),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
