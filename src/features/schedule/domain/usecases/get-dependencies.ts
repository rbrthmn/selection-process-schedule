import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../repositories/schedule-repository';
import {TYPES} from '../../../../core/types';
import {DependencyEntity} from "../entities/dependency-entity";

export interface GetDependenciesUseCase {
    execute(): DependencyEntity[];
}

@injectable()
export class GetDependencies implements GetDependenciesUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(): DependencyEntity[] {
        return this.repository.getDependencies();
    }
}
