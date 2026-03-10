import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {TYPES} from '../../../../core/types';
import {Event} from "../entities/event";

export interface GetEventsUseCase {
    execute(): Event[];
}

@injectable()
export class GetEvents implements GetEventsUseCase {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(): Event[] {
        return this.repository.getEvents();
    }
}
