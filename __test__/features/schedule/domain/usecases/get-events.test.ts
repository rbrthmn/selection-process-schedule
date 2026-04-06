import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {GetEvents} from '../../../../../src/features/schedule/domain/usecases/get-events';
import {
    ScheduleRepositoryContract
} from '../../../../../src/features/schedule/domain/repositories/schedule-repository-contract';
import {EventValidatorContract} from '../../../../../src/features/schedule/domain/services/event-validator';
import {Event} from '../../../../../src/features/schedule/domain/entities/event';
import {Dependency} from '../../../../../src/features/schedule/domain/entities/dependency';
import {ScheduleCalculatorContract} from "../../../../../src/features/schedule/domain/services/schedule-calculator";

describe('GetEvents', () => {
    let repository: jest.Mocked<ScheduleRepositoryContract>;
    let validator: jest.Mocked<EventValidatorContract>;
    let calculator: jest.Mocked<ScheduleCalculatorContract>;
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
        calculator = {
            calculateDates: jest.fn(),
        };
        getEvents = new GetEvents(repository, validator, calculator);
    });

    describe('execute', () => {
        it('with valid selectionProcessId and no cyclic dependency should return the events', () => {
            const selectionProcessId = '1';
            const initialDate = '2026-01-01';
            const events = [new Event('1', '1', 'Event 1', 'test', null, null, 1, true)];
            const dependencies: Dependency[] = [];
            const calculatedEvents = [...events];
            repository.getEvents.mockReturnValue(events);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(false);
            calculator.calculateDates.mockReturnValue(calculatedEvents);

            const result = getEvents.execute(selectionProcessId);

            expect(repository.getEvents).toHaveBeenCalledWith(selectionProcessId);
            expect(repository.getDependencies).toHaveBeenCalledWith(['1']);
            expect(validator.hasCyclicDependency).toHaveBeenCalledWith([], events, dependencies);
            expect(calculator.calculateDates).toHaveBeenCalledWith(initialDate, events, dependencies);
            expect(result).toEqual({
                success: true,
                events: calculatedEvents,
            });
        });

        it('should return error message when cyclic dependency is detected', () => {
            const selectionProcessId = '1';
            const events = [new Event('1', '1', 'Event 1', 'test', null, null, 1, true)];
            const dependencies: Dependency[] = [];
            repository.getEvents.mockReturnValue(events);
            repository.getDependencies.mockReturnValue(dependencies);
            validator.hasCyclicDependency.mockReturnValue(true);

            const result = getEvents.execute(selectionProcessId);

            expect(repository.getEvents).toHaveBeenCalledWith(selectionProcessId);
            expect(validator.hasCyclicDependency).toHaveBeenCalledWith([], events, dependencies);
            expect(calculator.calculateDates).not.toHaveBeenCalled();
            expect(result).toEqual({
                success: false,
                message: 'Cyclic dependency detected',
            });
        });
    });
});
