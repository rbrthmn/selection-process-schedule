import {injectable, inject} from 'inversify';
import {ScheduleRepositoryContract} from '../domain/repositories/schedule-repository-contract';
import {ScheduleDatasource, ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepositoryContract {
    constructor(@inject(ScheduleDatasource) private readonly datasource: ScheduleDatasourceContract) {
    }

    createEvent(event: Event): Event {
        return this.datasource.createEvent(event);
    }

    getEvents(selectionProcessId: string): Event[] {
        return this.datasource.getEvents(selectionProcessId);
    }

    updateEvent(event: Event): Event {
        return this.datasource.updateEvent(event);
    }

    deleteEvent(id: string): void {
        this.datasource.deleteEvent(id);
    }

    createDependency(dependency: Dependency): Dependency {
        return this.datasource.createDependency(dependency);
    }

    getDependencies(eventsIds: string[]): Dependency[] {
        return this.datasource.getDependencies(eventsIds);
    }
}
