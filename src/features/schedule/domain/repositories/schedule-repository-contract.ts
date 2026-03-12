import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export const ScheduleRepository = Symbol.for('ScheduleRepository');

export interface ScheduleRepositoryContract {
    createEvent(event: Event): Event;

    getEvents(selectionProcessId: string): Event[];

    createDependency(dependency: Dependency): Dependency;

    getDependencies(): Dependency[];

    // Add other abstract methods for schedule-related operations as needed
}
