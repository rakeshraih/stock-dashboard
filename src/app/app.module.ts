import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptComponent } from './scripts/script/script.component';
import { HttpModule } from '@angular/http';
import { ScriptsService } from './scripts/scripts.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SuggestionComponent,
    ScriptsComponent,
    ScriptComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, HttpModule
  ],
  providers: [ ScriptsService ],
  bootstrap: [AppComponent],
  entryComponents: [ ScriptComponent ]
})
export class AppModule { }
