import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-event-modal',
  templateUrl: './delete-event-modal.component.html',
  styleUrl: './delete-event-modal.component.scss'
})
export class DeleteEventModalComponent {
  constructor(public modal: NgbActiveModal) {
  }
}
