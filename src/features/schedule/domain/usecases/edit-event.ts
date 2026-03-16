import {injectable, inject} from 'inversify';
import {ScheduleRepository, ScheduleRepositoryContract} from '../repositories/schedule-repository-contract';
import {Event} from "../entities/event";
import {EventValidator, EventValidatorSymbol} from "../services/event-validator";
import {Dependency} from '../entities/dependency';
import {AppError} from "../../../../core/errors/custom-error";

export interface EditEventUseCaseContract {
    execute(selectionProcessId: string, eventId: string, validatedData: any): Event;
}

export const EditEventUseCase = Symbol.for('EditEventUseCase')

/**
 * @class EditEvent
 * @implements {EditEventUseCaseContract}
 * @description Use case for editing an existing event.
 */
@injectable()
export class EditEvent implements EditEventUseCaseContract {
    constructor(
        @inject(ScheduleRepository) private readonly repository: ScheduleRepositoryContract,
        @inject(EventValidatorSymbol) private readonly validator: EventValidator
    ) {
    }

    /**
     * @method execute
     * @param {string} selectionProcessId - The ID of the selection process.
     * @param {string} eventId - The ID of the event to be edited.
     * @param {any} validatedData - The new data for the event.
     * @returns {Event} The updated event.
     * @throws {AppError} If a cyclic dependency is detected.
     * @throws {Error} If the event is not found.
     * @description Executes the use case to edit an event, checking for cyclic dependencies before updating.
     */
    execute(selectionProcessId: string, eventId: string, validatedData: any): Event {
        const events = this.repository.getEvents(selectionProcessId);
        const dependencies = this.repository.getDependencies(events.map(event => event.id));
        const newData = {id: eventId, ...validatedData};

        if (this.validator.hasCyclicDependency(newData, events, dependencies)) {
            throw AppError.badRequest("Cyclic dependency detected")
        } else {
            const event = events.find(e => e.id === eventId);
            if (!event) throw new Error("Event not found");

            const updatedEvent = new Event(
                eventId,
                selectionProcessId,
                validatedData.name ?? event.name,
                validatedData.type ?? event.type,
                null,
                null,
                validatedData.durationDays ?? event.durationDays,
                validatedData.isActive ?? event.isActive
            );

            if (validatedData.dependencies) {
                this.repository.deleteDependencies(eventId);
                for (const dependencyId of validatedData.dependencies) {
                    this.repository.createDependency(new Dependency('', eventId, dependencyId));
                }
            }

            return this.repository.updateEvent(updatedEvent)
        }
    }
}
