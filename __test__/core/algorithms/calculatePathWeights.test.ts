import {describe, it, expect} from '@jest/globals';
import {calculatePathWeights} from '../../../src/core/algorithms/calculatePathWeights';

describe('calculatePathWeights', () => {
    it('with an empty graph should return an empty object', () => {
        const graph = {};

        const result = calculatePathWeights(graph);

        expect(result).toEqual({});
    });

    it('with a single vertex should return weights based on its own duration', () => {
        const graph = {
            1: {1: 10}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10]
        });
    });

    it('with two connected vertices should propagate weights correctly', () => {
        const graph = {
            1: {1: 10},
            2: {2: 20, 1: 5}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10],
            2: [15, 35]
        });
    });

    it('with multiple predecessors should choose the longest path (max weight)', () => {
        const graph = {
            1: {1: 10},
            2: {2: 20},
            3: {3: 30, 1: 5, 2: 10}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10],
            2: [0, 20],
            3: [30, 60]
        });
    });

    it('with a chain of vertices should accumulate weights', () => {
        const graph = {
            1: {1: 10},
            2: {2: 10, 1: 5},
            3: {3: 10, 2: 5}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10],
            2: [15, 25],
            3: [30, 40]
        });
    });

    it('with disconnected components should calculate weights independently', () => {
        const graph = {
            1: {1: 10},
            2: {2: 20}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10],
            2: [0, 20]
        });
    });

    it('with complex dependencies should find the critical path', () => {
        const graph = {
            1: {1: 10},
            2: {2: 10, 1: 5},
            3: {3: 10, 1: 20},
            4: {4: 10, 2: 5, 3: 5}
        };

        const result = calculatePathWeights(graph);

        expect(result).toEqual({
            1: [0, 10],
            2: [15, 25],
            3: [30, 40],
            4: [45, 55]
        });
    });
});
