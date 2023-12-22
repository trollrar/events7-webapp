import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventType} from "../event-summary/event-summary.interface";
import {EventService} from "../event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Event} from "../event.interface";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @Input() public form: FormGroup = this.fb.group({
    name: this.fb.control(''),
    type: this.fb.control(''),
    priority: this.fb.control(0),
    description: this.fb.control(''),
  });
  @Input() public error?: string;
  @Input() public loading = false;
  @Output() public submitFrom: EventEmitter<Event> = new EventEmitter<Event>();

  public availableTypes: EventType[] = ['app', 'liveops', 'crosspromo']
  public priorities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
  ) {
    if (this.eventService.canManageAdsEventsLast) {
      this.availableTypes = ['ads', ...this.availableTypes];
    }
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
    console.log('form');
    let event: Event = this.form.value as Event;
    event.priority = Number(event.priority);
    this.submitFrom.emit(event);
  }
}
