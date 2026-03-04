import {DependencyEntity} from '../entities/dependency.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';

export interface GetDependenciesUseCase {
    execute(): DependencyEntity[];
}

export class GetDependencies implements GetDependenciesUseCase {
    constructor(private readonly repository: ScheduleRepository) {
    }

    execute(): DependencyEntity[] {
        return this.repository.getDependencies();
    }
}
