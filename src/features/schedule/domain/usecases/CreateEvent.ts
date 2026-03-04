import {EventEntity} from '../entities/event.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';

export interface CreateEventUseCase {
    execute(event: EventEntity): EventEntity;
}

export class CreateEvent implements CreateEventUseCase {
    constructor(private readonly repository: ScheduleRepository) {
    }

    execute(event: EventEntity): EventEntity {
        return this.repository.createEvent(event);
    }
}
