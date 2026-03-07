import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../domain/repositories/schedule-repository';
import {ScheduleDatasource} from '../domain/datasources/schedule-datasource';
import {TYPES} from "../../../core/types";
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    constructor(@inject(TYPES.ScheduleDatasource) private readonly datasource: ScheduleDatasource) {
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