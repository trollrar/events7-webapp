import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventSummary} from "./event-summary.interface";
import {EventService} from "../event.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteEventModalComponent} from "../delete-event-modal/delete-event-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.scss'
})
export class EventSummaryComponent {
  @Input()
  public event!: EventSummary;
  @Output()
  public reload = new EventEmitter<void>;
  public deleteError?: string;
  constructor(public eventService: EventService, private modalService: NgbModal) {}

  deleteEvent() {
    let ref = this.modalService.open(DeleteEventModalComponent);
    ref.result.then(
      () => {
        this.eventService.deleteEvent(this.event!.id).subscribe({
          next: () => {
            this.reload.emit();
          },
          error: (error) => {
            this.deleteError = error.error.message;
          }
        });
      },
      () => {}
    );
  }
}
