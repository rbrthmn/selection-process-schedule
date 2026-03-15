import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {EventValidatorContract, EventValidatorSymbol} from "../services/event-validator";

export interface GetEventsUseCaseContract {
    execute(selectionProcessId: string): object;
}

export const GetEventsUseCase = Symbol.for('GetEventsUseCase')

@injectable()
export class GetEvents implements GetEventsUseCaseContract {
    constructor(
        @inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract,
        @inject(EventValidatorSymbol) private readonly validator: EventValidatorContract
    ) {
    }

    execute(selectionProcessId: string): object {
        const events = this.repository.getEvents(selectionProcessId)
        const dependencies = this.repository.getDependencies(events.map(event => event.id))

        return this.validator.hasCyclicDependency([], events, dependencies) ?
            {"success": false, "message": "Cyclic dependency detected"} :
            {"success": true, "events": events};
    }
}
