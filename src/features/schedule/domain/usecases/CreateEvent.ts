import {injectable, inject} from 'inversify';
import {EventEntity} from '../entities/event.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';
import {TYPES} from '../../../../core/types';

export interface CreateEventUseCase {
    execute(event: EventEntity): EventEntity;
}

@injectable()
export class CreateEvent implements CreateEventUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(event: EventEntity): EventEntity {
        return this.repository.createEvent(event);
    }
}
