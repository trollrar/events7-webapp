import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoadingComponent} from './loading/loading.component';
import { SortDirectionComponent } from './sort-direction/sort-direction.component';


@NgModule({
    declarations: [LoadingComponent, SortDirectionComponent],
    exports: [LoadingComponent, SortDirectionComponent],
    imports: [
        CommonModule,
    ],
})
export class SharedModule {}
