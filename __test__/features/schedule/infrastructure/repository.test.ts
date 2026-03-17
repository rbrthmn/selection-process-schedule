import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ScheduleRepositoryImpl } from '../../../../src/features/schedule/infrastructure/repository';
import { ScheduleDatasourceContract } from '../../../../src/features/schedule/domain/datasources/schedule-datasource-contract';
import { Event } from '../../../../src/features/schedule/domain/entities/event';
import { Dependency } from '../../../../src/features/schedule/domain/entities/dependency';

describe('ScheduleRepositoryImpl', () => {
    let datasource: jest.Mocked<ScheduleDatasourceContract>;
    let repository: ScheduleRepositoryImpl;

    beforeEach(() => {
        datasource = {
            createEvent: jest.fn(),
            getEvents: jest.fn(),
            updateEvent: jest.fn(),
            deleteEvent: jest.fn(),
            createDependency: jest.fn(),
            getDependencies: jest.fn(),
            deleteDependencies: jest.fn(),
        };
        repository = new ScheduleRepositoryImpl(datasource);
    });

    describe('createEvent', () => {
        it('with a valid event should call datasource.createEvent and return the result', () => {
            const event = new Event('1', '1', 'Test Event', 'test', null, null, 1, true);
            datasource.createEvent.mockReturnValue(event);

            const result = repository.createEvent(event);

            expect(datasource.createEvent).toHaveBeenCalledWith(event);
            expect(result).toBe(event);
        });
    });

    describe('getEvents', () => {
        it('with a selectionProcessId should call datasource.getEvents and return the result', () => {
            const selectionProcessId = '1';
            const events = [new Event('1', '1', 'Test Event', 'test', null, null, 1, true)];
            datasource.getEvents.mockReturnValue(events);

            const result = repository.getEvents(selectionProcessId);

            expect(datasource.getEvents).toHaveBeenCalledWith(selectionProcessId);
            expect(result).toBe(events);
        });
    });

    describe('updateEvent', () => {
        it('with a valid event should call datasource.updateEvent and return the result', () => {
            const event = new Event('1', '1', 'Updated Event', 'test', null, null, 1, true);
            datasource.updateEvent.mockReturnValue(event);

            const result = repository.updateEvent(event);

            expect(datasource.updateEvent).toHaveBeenCalledWith(event);
            expect(result).toBe(event);
        });
    });

    describe('deleteEvent', () => {
        it('with a valid id should call datasource.deleteEvent', () => {
            const eventId = '1';

            repository.deleteEvent(eventId);

            expect(datasource.deleteEvent).toHaveBeenCalledWith(eventId);
        });
    });

    describe('createDependency', () => {
        it('with a valid dependency should call datasource.createDependency and return the result', () => {
            const dependency = new Dependency('1', '2', 0);
            datasource.createDependency.mockReturnValue(dependency);

            const result = repository.createDependency(dependency);

            expect(datasource.createDependency).toHaveBeenCalledWith(dependency);
            expect(result).toBe(dependency);
        });
    });

    describe('getDependencies', () => {
        it('with event IDs should call datasource.getDependencies and return the result', () => {
            const eventIds = ['1', '2'];
            const dependencies = [new Dependency('1', '2', 0)];
            datasource.getDependencies.mockReturnValue(dependencies);

            const result = repository.getDependencies(eventIds);

            expect(datasource.getDependencies).toHaveBeenCalledWith(eventIds);
            expect(result).toBe(dependencies);
        });
    });

    describe('deleteDependencies', () => {
        it('with an eventId should call datasource.deleteDependencies', () => {
            const eventId = '1';

            repository.deleteDependencies(eventId);

            expect(datasource.deleteDependencies).toHaveBeenCalledWith(eventId);
        });
    });
});
