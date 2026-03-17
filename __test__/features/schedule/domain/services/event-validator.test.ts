import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { EventValidator } from '../../../../../src/features/schedule/domain/services/event-validator';
import { Pipeline } from '../../../../../src/core/services/pipeline';
import { Event } from '../../../../../src/features/schedule/domain/entities/event';
import { Dependency } from '../../../../../src/features/schedule/domain/entities/dependency';

jest.mock('../../../../../src/core/services/pipeline');

describe('EventValidator', () => {
    let pipeline: jest.Mocked<Pipeline>;
    let eventValidator: EventValidator;

    beforeEach(() => {
        pipeline = new Pipeline() as jest.Mocked<Pipeline>;
        pipeline.through.mockReturnThis();
        eventValidator = new EventValidator(pipeline);
    });

    describe('hasCyclicDependency', () => {
        it('with a set of events and dependencies should call the pipeline with the correct payload', () => {
            const newData = {};
            const events: Event[] = [];
            const dependencies: Dependency[] = [];

            eventValidator.hasCyclicDependency(newData, events, dependencies);

            expect(pipeline.through).toHaveBeenCalled();
            expect(pipeline.send).toHaveBeenCalledWith({
                newData,
                events,
                dependencies,
                vertexes: [],
                edges: [],
                graph: [],
            });
        });

        it('when pipeline returns true should return true', () => {
            pipeline.send.mockReturnValue(true);

            const result = eventValidator.hasCyclicDependency({}, [], []);

            expect(result).toBe(true);
        });

        it('when pipeline returns false should return false', () => {
            pipeline.send.mockReturnValue(false);

            const result = eventValidator.hasCyclicDependency({}, [], []);

            expect(result).toBe(false);
        });
    });
});
