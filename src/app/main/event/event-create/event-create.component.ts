import {Component} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";
import {Event} from "../event.interface";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {
  public error?: string;
  public loading = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(`Events7 - Create Event`)
  }

  onSubmit(event: Event) {
    this.loading = true;
    this.eventService.createEvent(event).subscribe(
      {
        next: (event) => {
          this.router.navigateByUrl('/' + event.id);
        },
        error: (error) => {
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
