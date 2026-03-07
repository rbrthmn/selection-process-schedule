import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../domain/repositories/schedule-repository';
import {ScheduleDatasource, ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {TYPES} from "../../../core/types";
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
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

export type ScheduleRepositoryType = ScheduleRepository;