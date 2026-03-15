import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";
import {EventValidatorContract, EventValidatorSymbol} from "../services/event-validator";

export interface GetEventsUseCaseContract {
    execute(selectionProcessId: string): Event[];
}

export const GetEventsUseCase = Symbol.for('GetEventsUseCase')

@injectable()
export class GetEvents implements GetEventsUseCaseContract {
    constructor(
        @inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract,
        @inject(EventValidatorSymbol) private readonly validator: EventValidatorContract
    ) {
    }

    execute(selectionProcessId: string): Event[] {
        const events = this.repository.getEvents(selectionProcessId)
        const dependencies = this.repository.getDependencies(events.map(event => event.id))

        this.validator.validateCyclicDependency([], events, dependencies)

        return [];
    }
}
