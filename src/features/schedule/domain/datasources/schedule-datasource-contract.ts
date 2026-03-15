import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export const ScheduleDatasource = Symbol.for('ScheduleDatasource');

export interface ScheduleDatasourceContract {
    createEvent(event: Event): Event;

    getEvents(selectionProcessId: string): Event[];

    updateEvent(event: Event): Event;

    deleteEvent(id: string): void;

    createDependency(dependency: Dependency): Dependency;

    getDependencies(eventsIds: string[]): Dependency[];
}
