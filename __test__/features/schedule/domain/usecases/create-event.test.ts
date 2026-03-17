import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {CreateEvent} from '../../../../../src/features/schedule/domain/usecases/create-event';
import {
    ScheduleRepositoryContract
} from '../../../../../src/features/schedule/domain/repositories/schedule-repository-contract';
import {Event} from '../../../../../src/features/schedule/domain/entities/event';

describe('CreateEvent', () => {
    let repository: jest.Mocked<ScheduleRepositoryContract>;
    let createEvent: CreateEvent;

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
        createEvent = new CreateEvent(repository);
    });

    describe('execute', () => {
        it('with a valid event should call repository.createEvent and return the created event', () => {
            const event = new Event('1', '1', 'Test Event', 'test', null, null, 1, true);
            repository.createEvent.mockReturnValue(event);

            const result = createEvent.execute(event);

            expect(repository.createEvent).toHaveBeenCalledWith(event);
            expect(result).toBe(event);
        });
    });
});
