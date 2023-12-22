import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {EventSummaryComponent} from './event/event-summary/event-summary.component';
import {EventPageComponent} from './event/event-page/event-page.component';
import {EventCreateComponent} from './event/event-create/event-create.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {EventComponent} from "./event/event.component";
import {SharedModule} from "../shared/shared.module";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventUpdateComponent } from './event/event-update/event-update.component';


const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: EventPageComponent,
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
    {
      path: ':id/edit',
      pathMatch: 'full',
      component: EventUpdateComponent,
    },
  ]
}];

@NgModule({
  declarations: [
    MainComponent,
    EventSummaryComponent,
    EventPageComponent,
    EventCreateComponent,
    EventFormComponent,
    EventUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    SharedModule,
    NgbPagination,
    ReactiveFormsModule,
  ]
})
export class MainModule {
}
