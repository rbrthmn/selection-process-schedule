import {injectable} from 'inversify';
import {ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";

const EVENTS_MOCK: Event[] = [];
const DEPENDENCIES_MOCK: Dependency[] = [];

@injectable()
export class LocalScheduleDatasourceImpl implements ScheduleDatasourceContract {
    createEvent(event: Event): Event {
        const newEvent = new Event(
            (EVENTS_MOCK.length + 1).toString(),
            event.name,
            event.type,
            event.initialDate,
            event.endDate,
            [],
            event.durationDays
        );
        EVENTS_MOCK.push(newEvent);
        return newEvent;
    }

    getEvents(): Event[] {
        return EVENTS_MOCK;
    }

    createDependency(dependency: Dependency): Dependency {
        const newEvent = new Event(
            (EVENTS_MOCK.length + 1).toString(),
            '',
            '',
            '',
            '',
            [],
           0
        );
        return new Dependency("", newEvent, newEvent, 0);
    }

    getDependencies(): Dependency[] {
        return DEPENDENCIES_MOCK;
    }
}
