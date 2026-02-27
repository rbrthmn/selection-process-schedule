import { Event, Dependency } from '../domain';

export interface IScheduleService {
  createEvent(name: string, duration: number): Event;
  getEvents(): Event[];
  getDependencies(): Dependency[];
  // Add other methods as needed
}
