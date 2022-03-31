import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTeamsComponent } from './components/create-teams/create-teams.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { AllPlayersComponent } from './components/all-players/all-players.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTeamsComponent,
    MainComponent,
    NavComponent,
    AllPlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
