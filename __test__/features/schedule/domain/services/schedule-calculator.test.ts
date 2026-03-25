import {describe, it, expect, jest, beforeEach} from '@jest/globals';
import {ScheduleCalculator} from "../../../../../src/features/schedule/domain/services/schedule-calculator";
import {Pipeline} from "../../../../../src/core/services/pipeline";
import {Event} from "../../../../../src/features/schedule/domain/entities/event";
import {Dependency} from "../../../../../src/features/schedule/domain/entities/dependency";
import {InitVertexesAndEdges} from "../../../../../src/features/schedule/domain/pipes/init-vertexes-and-edges";
import {GenerateAdjacencyMatrix} from "../../../../../src/features/schedule/domain/pipes/generate-adjacency-matrix";
import {CalculateWeights} from "../../../../../src/features/schedule/domain/pipes/calculate-weights";
import {AssignEventDates} from "../../../../../src/features/schedule/domain/pipes/assign-event-dates";

describe('ScheduleCalculator', () => {
    let pipeline: jest.Mocked<Pipeline>;
    let calculator: ScheduleCalculator;

    beforeEach(() => {
        pipeline = {
            through: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as jest.Mocked<Pipeline>;
        calculator = new ScheduleCalculator(pipeline);
    });

    describe('calculateDates', () => {
        it('should setup pipeline with correct pipes and send payload', () => {
            const initialDate = '2023-01-01';
            const events = [new Event('1', 'proc1', 'Event 1', 'type1', null, null, 10, true)];
            const dependencies = [new Dependency('1', '2', 5)];

            calculator.calculateDates(initialDate, events, dependencies);

            expect(pipeline.through).toHaveBeenCalledTimes(1);
            const pipes = (pipeline.through as jest.Mock).mock.calls[0][0] as any[];
            expect(pipes).toHaveLength(4);
            expect(pipes[0]).toBeInstanceOf(InitVertexesAndEdges);
            expect(pipes[1]).toBeInstanceOf(GenerateAdjacencyMatrix);
            expect(pipes[2]).toBeInstanceOf(CalculateWeights);
            expect(pipes[3]).toBeInstanceOf(AssignEventDates);
            expect(pipeline.send).toHaveBeenCalledTimes(1);
            expect(pipeline.send).toHaveBeenCalledWith({
                initialDate: initialDate,
                events: events,
                dependencies: dependencies,
                vertexes: null,
                edges: null,
                adjacencyMatrix: null,
                weights: null
            });
        });
    });
});
