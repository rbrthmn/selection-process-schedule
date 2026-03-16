import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";

export interface CreateEventUseCaseContract {
    execute(event: Event): Event;
}

export const CreateEventUseCase = Symbol.for('CreateEventUseCase')

/**
 * @class CreateEvent
 * @implements {CreateEventUseCaseContract}
 * @description Use case for creating a new event.
 */
@injectable()
export class CreateEvent implements CreateEventUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    /**
     * @method execute
     * @param {Event} event - The event to be created.
     * @returns {Event} The created event.
     * @description Executes the use case to create a new event.
     */
    execute(event: Event): Event {
        return this.repository.createEvent(event);
    }
}
