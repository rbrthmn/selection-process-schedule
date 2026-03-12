import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";

export interface EditEventUseCaseContract {
    execute(event: Event): Event;
}

export const EditEventUseCase = Symbol.for('EditEventUseCase')

@injectable()
export class EditEvent implements EditEventUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(event: Event): Event {
        return this.repository.updateEvent(event);
    }
}
