import {Injectable} from '@angular/core';
import {EventQueryInterface} from "./event-query.interface";
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EventQueryService {

  constructor() {
  }

  public toHttpParams(queryInterface: EventQueryInterface): HttpParams {
    const options: HttpParamsOptions = {
      fromObject: this.toParams(queryInterface)
    }

    return  new HttpParams(options);
  }

  public toParams(queryInterface: EventQueryInterface): Params {
    const params: Params = {};

    if (queryInterface.page) {
      params['page'] = queryInterface.page;
    }

    if (queryInterface.pageSize) {
      params['limit'] = queryInterface.pageSize;
    }

    if (queryInterface.sort) {
      params['sortBy'] = `${queryInterface.sort.field}:${queryInterface.sort.ascending ? 'ASC' : 'DESC'}`;
    }

    if (queryInterface.searchByName) {
      params['filter.name'] = `$ilike:${queryInterface.searchByName}`;
    }

    if (queryInterface.filterType) {
      params['filter.type'] = `$eq:${queryInterface.filterType}`;
    }

    if (queryInterface.filterPriority) {
      params['filter.priority'] = `$${queryInterface.filterPriority.condition}:${queryInterface.filterPriority.value}`;
    }

    return params;
  }

  public toQueryInterface(params: Params): EventQueryInterface {
    const eventQuery: EventQueryInterface = {};

    let page = Number(params['page']);
    if (page > 0) {
      eventQuery.page = page;
    }

    let pageSize = Number(params['limit']);
    if (pageSize > 1) {
      eventQuery.pageSize = pageSize;
    }

    let sortRegex = /^(type|id|name|priority):(ASC|DESC)$/;
    let sortBy = params['sortBy'];
    if (sortBy && sortRegex.test(sortBy)) {
      let sort = sortBy.split(':')
      eventQuery.sort = {
        // @ts-ignore
        field: sort[0],
        ascending: sort[1] === 'ASC'
      }
    }

    let searchByName = params['filter.name'];
    if (searchByName?.startsWith('$ilike:')) {
      eventQuery.searchByName = searchByName?.split(':')[1];
    }

    let filterTypeRegex = /^\$eq:(add|app|crosspromo|liveops)$/;
    let filterType = params['filter.type'];
    if (filterType && filterTypeRegex.test(filterType)) {
      // @ts-ignore
      eventQuery.filterType = filterType?.split(':')[1];
    }

    let filterPriorityRegex = /^(\$gt|\$lt|\$gte|\$lte|\$eq):(10|[0-9])$/;
    let filterPriority = params['filter.type'];
    if (filterPriority && filterPriorityRegex.test(filterPriority)) {
      let priority = filterPriority.split(':');
      eventQuery.filterPriority = {
        value: Number(priority[1]),
        // @ts-ignore
        condition: priority[0],
      }
    }

    return eventQuery;
  }
}
