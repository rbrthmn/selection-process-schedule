import { Event, Dependency } from '../domain';
import { IScheduleService } from './IScheduleService';

export class ScheduleService implements IScheduleService {
  private events: Event[] = [];
  private dependencies: Dependency[] = [];

  createEvent(name: string, duration: number): Event {
    if (this.events.some(event => event.name === name)) {
      throw new Error(`Event with name "${name}" already exists.`);
    }
    const newEvent: Event = {
      name: name,
      duration: duration,
      id: '',
      startDate: null,
      endDate: null
    };
    this.events.push(newEvent);
    return newEvent;
  }

  getEvents(): Event[] {
    return [...this.events]; // Return a copy to prevent external modification
  }

  getDependencies(): Dependency[] {
    return [...this.dependencies]; // Return a copy
  }

  // Methods for managing dependencies and schedule will go here
  // e.g., createDependency, getSchedule, etc.
}
