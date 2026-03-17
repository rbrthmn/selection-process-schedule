import {describe, it, expect} from '@jest/globals';
import {hasCycle} from '../../../src/core/algorithms/hasCycle';

describe('hasCycle', () => {
    it('with an empty graph should return false', () => {
        const graph = {};

        const result = hasCycle(graph);

        expect(result).toBe(false);
    });

    it('with no edges should return false', () => {
        const graph = {
            'A': [],
            'B': [],
            'C': []
        };

        const result = hasCycle(graph);

        expect(result).toBe(false);
    });

    it('with no cycles should return false', () => {
        const graph = {
            'A': ['B'],
            'B': ['C'],
            'C': []
        };

        const result = hasCycle(graph);

        expect(result).toBe(false);
    });

    it('with a self-cycle should return true', () => {
        const graph = {
            'A': ['A']
        };

        const result = hasCycle(graph);

        expect(result).toBe(true);
    });

    it('with simples cycle should return true', () => {
        const graph = {
            'A': ['B'],
            'B': ['A']
        };

        const result = hasCycle(graph);

        expect(result).toBe(true);
    });

    it('with larger cycle should return true', () => {
        const graph = {
            'A': ['B'],
            'B': ['C'],
            'C': ['D'],
            'D': ['A']
        };

        const result = hasCycle(graph);

        expect(result).toBe(true);
    });

    it('with disconnected graph with a cycle in one component should return true', () => {
        const graph = {
            'A': ['B'],
            'B': [],
            'C': ['D'],
            'D': ['C']
        };

        const result = hasCycle(graph);

        expect(result).toBe(true);
    });

    it('with disconnected graph with no cycles should return false', () => {
        const graph = {
            'A': ['B'],
            'B': [],
            'C': ['D'],
            'D': []
        };

        const result = hasCycle(graph);

        expect(result).toBe(false);
    });

    it('with complex graph should return true', () => {
        const graph = {
            'A': ['B', 'C'],
            'B': ['D'],
            'C': ['E'],
            'D': ['E'],
            'E': ['B']
        };

        const result = hasCycle(graph);

        expect(result).toBe(true);
    });
});

