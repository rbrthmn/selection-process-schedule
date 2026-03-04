import {injectable, inject} from 'inversify';
import {EventEntity} from '../entities/event.entity';
import {ScheduleRepository} from '../repositories/schedule.repository';
import {TYPES} from '../../../../core/types';

export interface GetEventsUseCase {
    execute(): EventEntity[];
}

@injectable()
export class GetEvents implements GetEventsUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(): EventEntity[] {
        return this.repository.getEvents();
    }
}
