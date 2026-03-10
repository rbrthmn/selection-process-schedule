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

    getEvents(): Event[] {
        return this.datasource.getEvents();
    }

    createDependency(dependency: Dependency): Dependency {
        return this.datasource.createDependency(dependency);
    }

    getDependencies(): Dependency[] {
        return this.datasource.getDependencies();
    }
}
