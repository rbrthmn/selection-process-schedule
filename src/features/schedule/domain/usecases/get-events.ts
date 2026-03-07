import {injectable, inject} from 'inversify';
import {ScheduleRepository} from '../repositories/schedule-repository';
import {TYPES} from '../../../../core/types';
import {Event} from "../entities/event";

export interface GetEventsUseCase {
    execute(): Event[];
}

@injectable()
export class GetEvents implements GetEventsUseCase {
    constructor(@inject(TYPES.ScheduleRepository) private readonly repository: ScheduleRepository) {
    }

    execute(): Event[] {
        return this.repository.getEvents();
    }
}
