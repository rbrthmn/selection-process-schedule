import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export abstract class ScheduleDatasource {
    abstract createEvent(event: Event): Event;

    abstract getEvents(): Event[];

    abstract createDependency(dependency: Dependency): Dependency;

    abstract getDependencies(): Dependency[];

    // Add other abstract methods for schedule-related operations as needed
}
