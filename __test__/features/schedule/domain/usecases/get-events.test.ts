import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {GetEvents} from '../../../../../src/features/schedule/domain/usecases/get-events';
import {
    ScheduleRepositoryContract
} from '../../../../../src/features/schedule/domain/repositories/schedule-repository-contract';
import {EventValidatorContract} from '../../../../../src/features/schedule/domain/services/event-validator';
import {Event} from '../../../../../src/features/schedule/domain/entities/event';
import {Dependency} from '../../../../../src/features/schedule/domain/entities/dependency';

describe('GetEvents', () => {
    let repository: jest.Mocked<ScheduleRepositoryContract>;
    let validator: jest.Mocked<EventValidatorContract>;
    let getEvents: GetEvents;

    beforeEach(() => {
        repository = {
            getEvents: jest.fn(),
            getDependencies: jest.fn(),
            createEvent: jest.fn(),
            updateEvent: jest.fn(),
            deleteEvent: jest.fn(),
            createDependency: jest.fn(),
            deleteDependencies: jest.fn(),
        };
        validator = {
            hasCyclicDependency: jest.fn(),
        };
        getEvents = new GetEvents(repository, validator);
    });

    describe('execute', () => {
        it('with valid selectionProcessId and no cyclic dependency should return the events', () => {
            const selectionProcessId = '1';
            const events = [new Event('1', '1', 'Event 1', 'test', null, null, 1, true)];
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue(events);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(false);

            const result = getEvents.execute(selectionProcessId);

            expect(repository.getEvents).toHaveBeenCalledWith(selectionProcessId);
            expect(result).toEqual({
                success: true,
                events: events,
            });
        });

        it('with valid selectionProcessId but with cyclic dependency should return an error message', () => {
            const selectionProcessId = '1';
            const events = [new Event('1', '1', 'Event 1', 'test', null, null, 1, true)];
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue(events);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(true);

            const result = getEvents.execute(selectionProcessId);

            expect(result).toEqual({
                success: false,
                message: 'Cyclic dependency detected',
            });
        });
    });
});
