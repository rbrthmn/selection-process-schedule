import {DependencyEntity} from '../entities/dependency.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';

export interface CreateDependencyUseCase {
    execute(dependency: DependencyEntity): DependencyEntity;
}

export class CreateDependency implements CreateDependencyUseCase {
    constructor(private readonly repository: ScheduleRepository) {
    }

    execute(dependency: DependencyEntity): DependencyEntity {
        return this.repository.createDependency(dependency);
    }
}
