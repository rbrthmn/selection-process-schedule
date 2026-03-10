import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {TYPES} from '../../../../core/types';
import {Dependency} from "../entities/dependency";

export interface CreateDependencyUseCase {
    execute(dependency: Dependency): Dependency;
}

@injectable()
export class CreateDependency implements CreateDependencyUseCase {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(dependency: Dependency): Dependency {
        return this.repository.createDependency(dependency);
    }
}
