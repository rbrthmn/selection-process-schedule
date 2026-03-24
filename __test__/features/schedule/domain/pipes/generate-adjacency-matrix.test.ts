import {describe, it, expect} from '@jest/globals';
import {GenerateAdjacencyMatrix} from "../../../../../src/features/schedule/domain/pipes/generate-adjacency-matrix";
import {Dependency} from "../../../../../src/features/schedule/domain/entities/dependency";

describe('GenerateAdjacencyMatrix', () => {
    describe('handle', () => {
        it('with vertexes, events and dependencies should generate adjacency matrix with weights', () => {
            const pipe = new GenerateAdjacencyMatrix();
            const payload = {
                vertexes: [1, 2],
                events: [
                    {id: 1, durationDays: 10},
                    {id: 2, durationDays: 20},
                ],
                dependencies: [
                    new Dependency('2', '1', 5)
                ],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({
                1: {1: 10, 2: null},
                2: {1: 5, 2: 20},
            });
        });

        it('with vertexes and events but no dependencies should generate adjacency matrix with vertex weights only', () => {
            const pipe = new GenerateAdjacencyMatrix();
            const payload = {
                vertexes: [1, 2],
                events: [
                    {id: 1, durationDays: 10},
                    {id: 2, durationDays: 20},
                ],
                dependencies: [],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({
                1: {1: 10, 2: null},
                2: {1: null, 2: 20},
            });
        });

        it('with no vertexes and no dependencies should generate empty adjacency matrix', () => {
            const pipe = new GenerateAdjacencyMatrix();
            const payload = {
                vertexes: [],
                events: [],
                dependencies: [],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({});
        });
    });
});
