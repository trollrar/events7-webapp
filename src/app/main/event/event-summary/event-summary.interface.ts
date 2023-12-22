export type EventType = 'ads' | 'app' | 'liveops' | 'crosspromo' ;

export interface EventSummary {
  id: number;
  name: string;
  type: EventType;
  priority: number;
}
