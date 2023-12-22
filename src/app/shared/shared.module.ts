import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoadingComponent} from './loading/loading.component';
import { SortDirectionComponent } from './sort-direction/sort-direction.component';
import {NotFoundComponent} from "./not-found/not-found.component";


@NgModule({
    declarations: [LoadingComponent, SortDirectionComponent, NotFoundComponent],
    exports: [LoadingComponent, SortDirectionComponent, NotFoundComponent],
    imports: [
        CommonModule,
    ],
})
export class SharedModule {}
