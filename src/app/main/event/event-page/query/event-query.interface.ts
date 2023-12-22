import {EventType} from "../../event-summary/event-summary.interface";

export type EventQuerySortField = 'type' | 'id' | 'name' | 'priority';
export type EventQueryPriorityCondition = 'eq' | 'gte' | 'gt' | 'lte' | 'lt';

export interface EventQueryInterface {
  page?: number,
  pageSize?: number,
  sort?: {
    field: EventQuerySortField,
    ascending: boolean
  },
  searchByName?: string,
  filterType?: EventType,
  filterPriority?: {
    value: number,
    condition: EventQueryPriorityCondition,
  },
}
