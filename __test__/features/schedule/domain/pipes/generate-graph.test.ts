import { GenerateGraph } from '../../../../../src/features/schedule/domain/pipes/generate-graph';
import {describe, it, expect, beforeEach} from '@jest/globals';
import {next} from "../../../../utils";

describe('GenerateGraph', () => {
    let pipe: GenerateGraph;

    beforeEach(() => {
        pipe = new GenerateGraph();
    });

    describe('handle', () => {
        it('with vertexes and edges should generate a graph adjacency list', () => {
            const payload = {
                vertexes: [1, 2, 3],
                edges: [
                    [1, 2],
                    [2, 3],
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.graph).toEqual({
                1: [2],
                2: [3],
                3: [],
            });
        });

        it('with isolated vertexes should generate a graph with empty adjacency lists', () => {
            const payload = {
                vertexes: [1, 2, 3],
                edges: [],
            };

            const result = pipe.handle(payload, next);

            expect(result.graph).toEqual({
                1: [],
                2: [],
                3: [],
            });
        });

        it('with multiple edges from the same vertex should generate a correct adjacency list', () => {
            const payload = {
                vertexes: [1, 2, 3],
                edges: [
                    [1, 2],
                    [1, 3],
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.graph).toEqual({
                1: [2, 3],
                2: [],
                3: [],
            });
        });

        it('with edges referencing non-existent vertexes should handle gracefully', () => {
            const payload = {
                vertexes: [1],
                edges: [
                    [1, 2],
                    [2, 3], 
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.graph).toEqual({
                1: [2],
            });
        });

        it('with empty vertexes and edges should generate an empty graph', () => {
            const payload = {
                vertexes: [],
                edges: [],
            };

            const result = pipe.handle(payload, next);

            expect(result.graph).toEqual({});
        });
    });
});
