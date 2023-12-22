import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EventQueryService} from "./query/event-query.service";
import {EventSummary, EventType} from "../event-summary/event-summary.interface";
import {Subscription} from "rxjs";
import {EventQueryInterface, EventQueryPriorityCondition, EventQuerySortField} from "./query/event-query.interface";
import {Page} from "../../../shared/interface/page.interface";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent  implements OnInit, OnDestroy {

  public events?: Page<EventSummary>;
  public loading: boolean = false;
  public pageQuery: EventQueryInterface = {};
  private paramsSubscription?: Subscription;
  public searchForm: FormControl = this.fb.control('');
  public filterableEvenTypes: EventType[] = ['add', 'app', 'crosspromo', 'liveops'];
  public sortableFields: EventQuerySortField[] = ['type', 'id', 'name', 'priority'];

  constructor (
    private eventService: EventService,
    private eventQueryService: EventQueryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit (): void {
    this.paramsSubscription = this.route.queryParams.subscribe((params: Params): void => {
      this.pageQuery = this.eventQueryService.toQueryInterface(params);
      this.searchForm.setValue(this.pageQuery.searchByName);
      this.loadEvents();
    });
  }

  public ngOnDestroy (): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  public fetchPage(page?: number) {
    if (page) {
      this.pageQuery.page = page;
    }
    this.applyPageQuery();
  }

  public changePageSize(e: Event) {
    const target = e.target as HTMLSelectElement;
    const pageSize = Number(target.value);
    if (pageSize) {
      this.pageQuery.pageSize = pageSize;
    }
    this.applyPageQuery();
  }

  public sortBy(field: EventQuerySortField, ascending?: boolean) {
    if (ascending !== undefined) {
      this.pageQuery.sort = { field, ascending }
      this.applyPageQuery();
      return;
    }

    this.pageQuery.sort = {
      field,
      ascending: this.pageQuery.sort?.field === field ? !this.pageQuery.sort.ascending : true
    }
    this.applyPageQuery();
  }


  public searchByName(event: Event) {
    event.preventDefault()
    this.pageQuery.searchByName = this.searchForm.value;
    this.applyPageQuery();
  }

  public filterByType(type: EventType) {
    if (this.pageQuery.filterType === type) {
      this.pageQuery.filterType = undefined;
      this.applyPageQuery();
      return;
    }

    console.log(type);
    this.pageQuery.filterType = type
    this.applyPageQuery();
  }

  public filterByPriority(value: number, condition: EventQueryPriorityCondition) {
    this.pageQuery.filterPriority = { value, condition }
    this.applyPageQuery();
  }


  public applyPageQuery(): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: this.eventQueryService.toParams(this.pageQuery),
    });
  }

  private loadEvents (): void {
    this.loading = true;
    this.eventService.getAll(this.pageQuery)
      .subscribe((events: Page<EventSummary>) => {
        this.events = events;
        this.loading = false;
      });
  }
}
