import {Component, OnInit} from '@angular/core';
import {Event} from "./event.interface";
import {EventService} from "./event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteEventModalComponent} from "./delete-event-modal/delete-event-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{
  public event?: Event
  public notFound = false
  public deleteError?: string;

  constructor(protected eventService: EventService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) {}

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

  deleteEvent() {
    let ref = this.modalService.open(DeleteEventModalComponent);
    ref.result.then(
      () => {
        this.eventService.deleteEvent(this.event!.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/');
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
