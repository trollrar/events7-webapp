import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "./page.interface";
import {environment} from "../../../environments/environment";
import {EventSummary} from "./event-summary/event-summary.interface";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  public getAll(eventPageQuery: {
    page?: number,
    pageSize?: number,
    sort?: {
      field: string,
      ascending: boolean
    },
    searchByName?: string,
    filterType?: string,
    filterPriority?: {
      value: number,
      condition: 'eq' | 'gte' | 'gt' | 'lte' | 'lt',
    },
  }): Observable<Page<EventSummary>> {
    const params = new HttpParams();

    if (eventPageQuery.page) {
      params.set('page', eventPageQuery.page);
    }

    if (eventPageQuery.pageSize) {
      params.set('limit', eventPageQuery.pageSize);
    }

    if (eventPageQuery.sort) {
      params.set('sortBy', `${eventPageQuery.sort.field}:${eventPageQuery.sort.ascending ? 'ASC' : 'DESC'}`);
    }

    if (eventPageQuery.searchByName) {
      params.set('filter.name', `$ilike:${eventPageQuery.searchByName}`);
    }

    if (eventPageQuery.filterType) {
      params.set('filter.name', `$eq:${eventPageQuery.searchByName}`);
    }

    if (eventPageQuery.filterPriority) {
      params.set('filter.priority', `$${eventPageQuery.filterPriority.condition}:${eventPageQuery.filterPriority.value}`);
    }

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

  public canManageAddTypeEvents(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/is-authorized`);
  }
}
