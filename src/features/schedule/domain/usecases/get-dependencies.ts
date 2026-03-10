import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {TYPES} from '../../../../core/types';
import {Dependency} from "../entities/dependency";

export interface GetDependenciesUseCase {
    execute(): Dependency[];
}

@injectable()
export class GetDependencies implements GetDependenciesUseCase {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(): Dependency[] {
        return this.repository.getDependencies();
    }
}
