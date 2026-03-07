import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../repositories/schedule-repository';
import {TYPES} from '../../../../core/types';
import {Event} from "../entities/event";

export interface CreateEventUseCase {
    execute(event: Event): Event;
}

@injectable()
export class CreateEvent implements CreateEventUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(event: Event): Event {
        return this.repository.createEvent(event);
    }
}
