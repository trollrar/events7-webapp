import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sort-direction',
  templateUrl: './sort-direction.component.html',
  styleUrl: './sort-direction.component.scss'
})
export class SortDirectionComponent {
  @Input() ascending!: boolean;
}
