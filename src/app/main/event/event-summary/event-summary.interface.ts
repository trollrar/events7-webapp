export type EventType = 'add' | 'app' | 'liveops' | 'crosspromo' ;

export interface EventSummary {
  id: number;
  name: string;
  type: EventType;
  priority: number;
}
