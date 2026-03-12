import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';

export interface DeleteEventUseCaseContract {
    execute(id: string): void;
}

export const DeleteEventUseCase = Symbol.for('DeleteEventUseCase')

@injectable()
export class DeleteEvent implements DeleteEventUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(id: string): void {
        this.repository.deleteEvent(id);
    }
}
