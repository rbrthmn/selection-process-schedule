import {describe, it, expect, beforeEach} from '@jest/globals';
import {CalculateWeights} from "../../../../../src/features/schedule/domain/pipes/calculate-weights";
import {next} from "../../../../utils";

describe('CalculateWeights', () => {
    let pipe: CalculateWeights;

    beforeEach(() => {
        pipe = new CalculateWeights();
    });

    describe('handle', () => {
        it('with adjacency matrix should calculate weights for each vertex', () => {
            const payload = {
                adjacencyMatrix: {
                    1: {1: 10, 2: null},
                    2: {1: 5, 2: 20}
                }
            };

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({
                1: [0, 10],
                2: [15, 35]
            });
        });

        it('with disconnected adjacency matrix should calculate weights independently', () => {
            const payload = {
                adjacencyMatrix: {
                    1: {1: 10, 2: null},
                    2: {1: null, 2: 20}
                }
            };

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({
                1: [0, 10],
                2: [0, 20]
            });
        });

        it('with empty adjacency matrix should return empty weights', () => {
            const payload = {
                adjacencyMatrix: {}
            };

            const result = pipe.handle(payload, next);

            expect(result.weights).toEqual({});
        });
    });
});
