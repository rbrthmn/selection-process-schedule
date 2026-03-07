import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../domain/repositories/schedule-repository';
import {ScheduleDatasource} from '../domain/datasources/schedule-datasource';
import {TYPES} from "../../../core/types";
import {EventEntity} from "../domain/entities/event-entity";
import {DependencyEntity} from "../domain/entities/dependency-entity";

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    constructor(@inject(TYPES.ScheduleDatasource) private readonly datasource: ScheduleDatasource) {
    }

    createEvent(event: EventEntity): EventEntity {
        return this.datasource.createEvent(event);
    }

    getEvents(): EventEntity[] {
        return this.datasource.getEvents();
    }

    createDependency(dependency: DependencyEntity): DependencyEntity {
        return this.datasource.createDependency(dependency);
    }

    getDependencies(): DependencyEntity[] {
        return this.datasource.getDependencies();
    }
}
