import {Component, Input} from '@angular/core';
import {EventSummary} from "./event-summary.interface";
import {EventService} from "../event.service";

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.scss'
})
export class EventSummaryComponent {
  @Input()
  public event!: EventSummary;

  constructor(public eventService: EventService) {}
}
