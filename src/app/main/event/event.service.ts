import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../shared/interface/page.interface";
import {environment} from "../../../environments/environment";
import {EventSummary} from "./event-summary/event-summary.interface";
import {Event} from "./event.interface";
import {EventQueryService} from "./event-page/query/event-query.service";
import {EventQueryInterface} from "./event-page/query/event-query.interface";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private eventQueryService: EventQueryService) {
    this.resetCanManageAdsEvents();
  }

  public canManageAdsEventsLast?: boolean;
  public canManageAdsEvents: EventEmitter<boolean> = new EventEmitter<boolean>();

  public resetCanManageAdsEvents() {
    this.isIpAuthorized().subscribe(isAuthorized => {
      this.canManageAdsEventsLast = isAuthorized;
      this.canManageAdsEvents.emit(isAuthorized);
    })
  }

  public getAll(eventPageQuery: EventQueryInterface): Observable<Page<EventSummary>> {
    let params = this.eventQueryService.toHttpParams(eventPageQuery);
    return this.http.get<Page<EventSummary>>(`${environment.apiUrl}`, { params });
  }

  getOne(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${environment.apiUrl}/${eventId}`);
  }

  public createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.apiUrl}`, event);
  }

  public updateEvent(eventId: number, event: Event): Observable<Event> {
    return this.http.patch<Event>(`${environment.apiUrl}/${eventId}`, event);
  }

  public deleteEvent(eventId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${eventId}`);
  }

  public isIpAuthorized(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/is-authorized`);
  }
}
