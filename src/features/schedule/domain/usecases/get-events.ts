import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";

export interface GetEventsUseCaseContract {
    execute(selectionProcessId: string): Event[];
}

export const GetEventsUseCase = Symbol.for('GetEventsUseCase')

@injectable()
export class GetEvents implements GetEventsUseCaseContract {
    constructor(@inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract) {
    }

    execute(selectionProcessId: string): Event[] {
        return this.repository.getEvents(selectionProcessId);
    }
}
