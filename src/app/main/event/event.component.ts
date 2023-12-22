import {Component, OnInit} from '@angular/core';
import {Event} from "./event.interface";
import {EventService} from "./event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{
  public event?: Event
  public notFound = false

  constructor(protected eventService: EventService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = Number(params.get('id'));
      if (!eventId) {
        this.showNotFound();
        return;
      }

      this.loadEvent(eventId);
    });
  }

  private loadEvent(id: number): void {
    this.eventService.getOne(id).subscribe(event => {
        this.event = event;
      }
    );
  }

  private showNotFound(): void {
    this.notFound = true;
  }
}
