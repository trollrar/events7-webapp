import {Component} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Event} from "../event.interface";
import {catchError} from "rxjs";
import {EventType} from "../event-summary/event-summary.interface";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {

  public form = this.fb.group({
    name: this.fb.control(''),
    type: this.fb.control(''),
    priority: this.fb.control(0),
    description: this.fb.control(''),
  });
  public error?: boolean;
  public loading = false;
  public availableTypes: EventType[] = ['app', 'liveops', 'crosspromo']
  public priorities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.eventService.canManageAdsEvents.subscribe(isAuthorized => {
      if (isAuthorized && !this.availableTypes.includes('ads')) {
        this.availableTypes = ['ads', ...this.availableTypes];
      }
      if (!isAuthorized && this.availableTypes.includes('ads')) {
        this.availableTypes = this.availableTypes.filter(value => value !== 'ads');
      }
    })
  }

  onSubmit() {
    let event: Event = this.form.value as Event;
    event.priority = Number(event.priority);
    this.loading = true;
    this.eventService.createEvent(event).subscribe(
      {
        next: (event) => {
          this.router.navigateByUrl('/' + event.id);
        },
        error: (error) => {
          console.log(error)
          if (error.status === 400) {
            this.error = error.error.message.join(',');
          }
          this.error = error.error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      }
    )
  }
}
