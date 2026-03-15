import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export const ScheduleRepository = Symbol.for('ScheduleRepository');

export interface ScheduleRepositoryContract {
    createEvent(event: Event): Event;

    getEvents(selectionProcessId: string): Event[];

    updateEvent(event: Event): Event;

    deleteEvent(id: string): void;

    createDependency(dependency: Dependency): Dependency;

    deleteDependencies(eventId: string): void;

    getDependencies(eventsIds: string[]): Dependency[];
}
