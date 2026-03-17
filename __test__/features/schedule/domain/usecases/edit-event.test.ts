import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {EditEvent} from '../../../../../src/features/schedule/domain/usecases/edit-event';
import {
    ScheduleRepositoryContract
} from '../../../../../src/features/schedule/domain/repositories/schedule-repository-contract';
import {
    EventValidatorContract
} from '../../../../../src/features/schedule/domain/services/event-validator';
import {Event} from '../../../../../src/features/schedule/domain/entities/event';
import {Dependency} from '../../../../../src/features/schedule/domain/entities/dependency';

describe('EditEvent', () => {
    let repository: jest.Mocked<ScheduleRepositoryContract>;
    let validator: jest.Mocked<EventValidatorContract>;
    let editEvent: EditEvent;

    beforeEach(() => {
        repository = {
            getEvents: jest.fn(),
            getDependencies: jest.fn(),
            deleteDependencies: jest.fn(),
            createDependency: jest.fn(),
            updateEvent: jest.fn(),
            createEvent: jest.fn(),
            deleteEvent: jest.fn(),
        };
        validator = {
            hasCyclicDependency: jest.fn(),
        };
        editEvent = new EditEvent(repository, validator);
    });

    describe('execute', () => {
        it('with valid data and no cyclic dependency should update the event', () => {
            const selectionProcessId = '1';
            const eventId = '1';
            const validatedData = {
                name: 'Updated Event',
                type: 'updated',
                durationDays: 2,
                isActive: false,
                dependencies: [2],
            };
            const existingEvent = new Event('1', '1', 'Event 1', 'test', null, null, 1, true);
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue([existingEvent]);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(false);
            const expectedEvent = new Event('1', '1', 'Updated Event', 'updated', null, null, 2, false);
            repository.updateEvent.mockReturnValue(expectedEvent);

            const result = editEvent.execute(selectionProcessId, eventId, validatedData);

            expect(repository.deleteDependencies).toHaveBeenCalledWith(eventId);
            expect(repository.createDependency).toHaveBeenCalledWith(new Dependency('', eventId, 2));
            expect(repository.updateEvent).toHaveBeenCalledWith(expectedEvent);
            expect(result).toBe(expectedEvent);
        });

        it('with valid data but with cyclic dependency should throw an error', () => {
            const selectionProcessId = '1';
            const eventId = '1';
            const validatedData = {
                name: 'Updated Event',
                type: 'updated',
                durationDays: 2,
                isActive: false,
                dependencies: [2],
            };
            const existingEvent = new Event('1', '1', 'Event 1', 'test', null, null, 1, true);
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue([existingEvent]);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(true);

            expect(() => {
                editEvent.execute(selectionProcessId, eventId, validatedData);
            }).toThrow("Cyclic dependency detected");
        });

        it('with non-existent event should throw an Error', () => {
            const selectionProcessId = '1';
            const eventId = '999';
            const validatedData = {
                name: 'Updated Event',
                type: 'updated',
                durationDays: 2,
                isActive: false,
                dependencies: [2],
            };
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue([]);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(false);

            expect(() => {
                editEvent.execute(selectionProcessId, eventId, validatedData);
            }).toThrow(Error);
        });
    });
});
