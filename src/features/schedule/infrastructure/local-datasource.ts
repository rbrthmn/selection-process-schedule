import {injectable} from 'inversify';
import {ScheduleDatasource} from '../domain/datasources/schedule-datasource';
import {EventEntity} from "../domain/entities/event-entity";
import {DependencyEntity} from "../domain/entities/dependency-entity";

const EVENTS_MOCK: EventEntity[] = [];
const DEPENDENCIES_MOCK: DependencyEntity[] = [];

@injectable()
export class LocalScheduleDatasourceImpl implements ScheduleDatasource {
    createEvent(event: EventEntity): EventEntity {
        EVENTS_MOCK.push(event);
        return event;
    }

    getEvents(): EventEntity[] {
        return EVENTS_MOCK;
    }

    createDependency(dependency: DependencyEntity): DependencyEntity {
        DEPENDENCIES_MOCK.push(dependency);
        return dependency;
    }

    getDependencies(): DependencyEntity[] {
        return DEPENDENCIES_MOCK;
    }
}
