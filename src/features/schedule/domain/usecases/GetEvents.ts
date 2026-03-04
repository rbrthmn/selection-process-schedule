import {EventEntity} from '../entities/event.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';

export interface GetEventsUseCase {
    execute(): EventEntity[];
}

export class GetEvents implements GetEventsUseCase {
    constructor(private readonly repository: ScheduleRepository) {
    }

    execute(): EventEntity[] {
        return this.repository.getEvents();
    }
}
