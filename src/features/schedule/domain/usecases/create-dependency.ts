import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../repositories/schedule-repository';
import {TYPES} from '../../../../core/types';
import {Dependency} from "../entities/dependency";

export interface CreateDependencyUseCase {
    execute(dependency: Dependency): Dependency;
}

@injectable()
export class CreateDependency implements CreateDependencyUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(dependency: Dependency): Dependency {
        return this.repository.createDependency(dependency);
    }
}
