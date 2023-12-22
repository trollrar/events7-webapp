import {Component, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "../event.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrl: './event-update.component.scss'
})
export class EventUpdateComponent implements OnInit{
  public event?: FormGroup<any>;
  public notFound = false
  public eventId?: number;
  public error?: string;
  public loading= false;

  constructor(protected eventService: EventService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = Number(params.get('id'));
      if (!this.eventId) {
        this.showNotFound();
        return;
      }

      this.loadEvent(this.eventId);
    });
  }

  private loadEvent(id: number): void {
    this.eventService.getOne(id).subscribe(event => {
        this.event = this.fb.group({
          name: this.fb.control(event.name),
          type: this.fb.control(event.type),
          priority: this.fb.control(event.priority),
          description: this.fb.control(event.description),
        });
      }
    );
  }

  private showNotFound(): void {
    this.notFound = true;
  }

  onSubmit(event: Event) {
    this.loading = true;
    this.eventService.updateEvent(this.eventId!, event).subscribe(
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
