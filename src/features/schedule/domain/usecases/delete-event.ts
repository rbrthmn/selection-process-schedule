import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';

export interface DeleteEventUseCaseContract {
    execute(id: string): void;
}

export const DeleteEventUseCase = Symbol.for('DeleteEventUseCase')

/**
 * @class DeleteEvent
 * @implements {DeleteEventUseCaseContract}
 * @description Use case for deleting an existing event.
 */
@injectable()
export class DeleteEvent implements DeleteEventUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    /**
     * @method execute
     * @param {string} id - The ID of the event to be deleted.
     * @returns {void}
     * @description Executes the use case to delete an event.
     */
    execute(id: string): void {
        this.repository.deleteEvent(id);
    }
}
