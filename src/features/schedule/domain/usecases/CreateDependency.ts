import {injectable, inject} from 'inversify';
import {DependencyEntity} from '../entities/dependency.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';
import {TYPES} from '../../../../core/types';

export interface CreateDependencyUseCase {
    execute(dependency: DependencyEntity): DependencyEntity;
}

@injectable()
export class CreateDependency implements CreateDependencyUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(dependency: DependencyEntity): DependencyEntity {
        return this.repository.createDependency(dependency);
    }
}
