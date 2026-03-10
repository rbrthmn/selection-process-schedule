import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {TYPES} from '../../../../core/types';
import {Event} from "../entities/event";

export interface CreateEventUseCase {
    execute(event: Event): Event;
}

@injectable()
export class CreateEvent implements CreateEventUseCase {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(event: Event): Event {
        return this.repository.createEvent(event);
    }
}
