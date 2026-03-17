import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {LocalScheduleDatasourceImpl} from '../../../../src/features/schedule/infrastructure/local-datasource';
import {Event} from '../../../../src/features/schedule/domain/entities/event';
import * as fs from 'fs';

jest.mock('fs');

describe('LocalScheduleDatasourceImpl', () => {
    let datasource: LocalScheduleDatasourceImpl;
    const mockFs = jest.mocked(fs);

    beforeEach(() => {
        jest.clearAllMocks();

        mockFs.existsSync.mockReturnValue(true);
        mockFs.readFileSync.mockReturnValue(JSON.stringify({events: [], dependencies: []}));
    });

    describe('createEvent', () => {
        it('with valid event data should create and return a new event with an ID', () => {
            datasource = new LocalScheduleDatasourceImpl();
            const event = new Event('', '1', 'New Event', 'test', null, null, 1, true);

            const result = datasource.createEvent(event);

            expect(result.id).toBe('1');
            expect(result.name).toBe('New Event');
        });
    });

    describe('getEvents', () => {
        it('with a specific selectionProcessId should return only events for that process', () => {
            const mockData = {
                events: [
                    {id: '1', selectionProcessId: '1', name: 'Event 1'},
                    {id: '2', selectionProcessId: '2', name: 'Event 2'},
                ],
                dependencies: [],
            };
            mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));
            datasource = new LocalScheduleDatasourceImpl();

            const result = datasource.getEvents('1');

            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('1');
        });
    });

    describe('updateEvent', () => {
        it('with an existing event should update its data', () => {
            const mockData = {
                events: [{id: '1', selectionProcessId: '1', name: 'Old Name'}],
                dependencies: [],
            };
            mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));
            datasource = new LocalScheduleDatasourceImpl();
            const updatedEvent = new Event('1', '1', 'New Name', 'test', null, null, 1, true);

            const result = datasource.updateEvent(updatedEvent);

            expect(result.name).toBe('New Name');
            const events = datasource.getEvents('1');
            expect(events[0].name).toBe('New Name');
        });

        it('with a non-existent event should throw an error', () => {
            datasource = new LocalScheduleDatasourceImpl();
            const nonExistentEvent = new Event('999', '1', 'Non-existent', 'test', null, null, 1, true);

            expect(() => {
                datasource.updateEvent(nonExistentEvent);
            }).toThrow('Event with id 999 not found');
        });
    });

    describe('deleteEvent', () => {
        it('with an existing event ID should remove the event', () => {
            const mockData = {
                events: [{id: '1', selectionProcessId: '1', name: 'To be deleted'}],
                dependencies: [],
            };
            mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));
            datasource = new LocalScheduleDatasourceImpl();

            datasource.deleteEvent('1');

            const events = datasource.getEvents('1');
            expect(events).toHaveLength(0);
        });
    });

    describe('deleteDependencies', () => {
        it('with an eventId should remove all related dependencies', () => {
            const mockData = {
                events: [],
                dependencies: [
                    {eventId: '1', previousEventId: '2'},
                    {eventId: '3', previousEventId: '1'},
                    {eventId: '3', previousEventId: '4'},
                ],
            };
            mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));
            datasource = new LocalScheduleDatasourceImpl();

            datasource.deleteDependencies('1');

            const dependencies = datasource.getDependencies(['1', '2', '3', '4']);
            expect(dependencies).toHaveLength(1);
            expect(dependencies[0].eventId).toBe('3');
            expect(dependencies[0].previousEventId).toBe('4');
        });
    });

    describe('getDependencies', () => {
        it('with a list of event IDs should return all related dependencies', () => {
            const mockData = {
                events: [],
                dependencies: [
                    {eventId: '1', previousEventId: '2'},
                    {eventId: '3', previousEventId: '4'},
                ],
            };
            mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));
            datasource = new LocalScheduleDatasourceImpl();

            const result = datasource.getDependencies(['1', '2']);

            expect(result).toHaveLength(1);
            expect(result[0].eventId).toBe('1');
        });
    });
});
