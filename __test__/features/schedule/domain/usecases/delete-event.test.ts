import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeleteEvent } from '../../../../../src/features/schedule/domain/usecases/delete-event';
import { ScheduleRepositoryContract } from '../../../../../src/features/schedule/domain/repositories/schedule-repository-contract';

describe('DeleteEvent', () => {
    let repository: jest.Mocked<ScheduleRepositoryContract>;
    let deleteEvent: DeleteEvent;

    beforeEach(() => {
        repository = {
            deleteEvent: jest.fn(),
            createEvent: jest.fn(),
            getEvents: jest.fn(),
            updateEvent: jest.fn(),
            createDependency: jest.fn(),
            deleteDependencies: jest.fn(),
            getDependencies: jest.fn(),
        };
        deleteEvent = new DeleteEvent(repository);
    });

    describe('execute', () => {
        it('with a valid event ID should call repository.deleteEvent', () => {
            const eventId = '1';

            deleteEvent.execute(eventId);

            expect(repository.deleteEvent).toHaveBeenCalledWith(eventId);
        });
    });
});
