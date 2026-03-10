import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";

export interface CreateEventUseCaseContract {
    execute(event: Event): Event;
}

export const CreateEventUseCase = Symbol.for('CreateEventUseCase')

@injectable()
export class CreateEvent implements CreateEventUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(event: Event): Event {
        return this.repository.createEvent(event);
    }
}
