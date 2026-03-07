import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../repositories/schedule-repository';
import {TYPES} from '../../../../core/types';
import {Dependency} from "../entities/dependency";

export interface GetDependenciesUseCase {
    execute(): Dependency[];
}

@injectable()
export class GetDependencies implements GetDependenciesUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(): Dependency[] {
        return this.repository.getDependencies();
    }
}
