import {describe, it, expect} from '@jest/globals';
import {CalculateWeights} from "../../../../../src/features/schedule/domain/pipes/calculate-weights";

describe('CalculateWeights', () => {
    describe('handle', () => {
        it('with adjacency matrix should calculate weights for each vertex', () => {
            const pipe = new CalculateWeights();
            const payload = {
                adjacencyMatrix: {
                    1: {1: 10, 2: null},
                    2: {1: 5, 2: 20}
                }
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({
                1: [0, 10],
                2: [15, 35]
            });
        });

        it('with disconnected adjacency matrix should calculate weights independently', () => {
            const pipe = new CalculateWeights();
            const payload = {
                adjacencyMatrix: {
                    1: {1: 10, 2: null},
                    2: {1: null, 2: 20}
                }
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({
                1: [0, 10],
                2: [0, 20]
            });
        });

        it('with empty adjacency matrix should return empty weights', () => {
            const pipe = new CalculateWeights();
            const payload = {
                adjacencyMatrix: {}
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({});
        });
    });
});
