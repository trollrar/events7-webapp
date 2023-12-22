import { Component } from '@angular/core';
import {EventService} from "./event/event.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public eventService: EventService) {
  }
}
