import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {EventSummaryComponent} from './event/event-summary/event-summary.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventCreateComponent} from './event/event-create/event-create.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {EventComponent} from "./event/event.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: EventCreateComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: EventComponent,
  },
];

@NgModule({
  declarations: [
    MainComponent,
    EventSummaryComponent,
    EventListComponent,
    EventCreateComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
  ]
})
export class MainModule {
}
