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
import { EffectsModule } from '@ngrx/effects'
import { ticketReducer } from './tickets/state/ticket.reducers'
import { TicketEffects } from './tickets/state/ticket.effects';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'

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
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({tickets: ticketReducer}),
    EffectsModule.forRoot([TicketEffects]),
    HttpClientModule,
    DragDropModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
