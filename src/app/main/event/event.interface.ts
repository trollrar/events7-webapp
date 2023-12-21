import {EventSummary} from "./event-summary/event-summary.interface";

export interface Event extends EventSummary{
  description: string;
}
