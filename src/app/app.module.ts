import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from "@angular/router";
import { EventComponent } from './main/event/event.component';

const routes: Routes = [{
  path: '',
  children: [{path: '', loadChildren: () => {
      return import('./main/main.module').then(m => m.MainModule);
    }}],
}];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
