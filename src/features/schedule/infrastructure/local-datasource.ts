import {injectable} from 'inversify';
import {ScheduleDatasource} from '../domain/datasources/schedule-datasource';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";

const EVENTS_MOCK: Event[] = [];
const DEPENDENCIES_MOCK: Dependency[] = [];

@injectable()
export class LocalScheduleDatasourceImpl implements ScheduleDatasource {
    createEvent(event: Event): Event {
        EVENTS_MOCK.push(event);
        return event;
    }

    getEvents(): Event[] {
        return EVENTS_MOCK;
    }

    createDependency(dependency: Dependency): Dependency {
        DEPENDENCIES_MOCK.push(dependency);
        return dependency;
    }

    getDependencies(): Dependency[] {
        return DEPENDENCIES_MOCK;
    }
}
