import {describe, it, expect, beforeEach} from '@jest/globals';
import {GenerateAdjacencyMatrix} from "../../../../../src/features/schedule/domain/pipes/generate-adjacency-matrix";
import {Dependency} from "../../../../../src/features/schedule/domain/entities/dependency";
import {next} from "../../../../utils";

describe('GenerateAdjacencyMatrix', () => {
    let pipe: GenerateAdjacencyMatrix;

    beforeEach(() => {
        pipe = new GenerateAdjacencyMatrix();
    });

    describe('handle', () => {
        it('with vertexes, events and dependencies should generate adjacency matrix with weights', () => {
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

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({
                1: {1: 10, 2: null},
                2: {1: 5, 2: 20},
            });
        });

        it('with vertexes and events but no dependencies should generate adjacency matrix with vertex weights only', () => {
            const payload = {
                vertexes: [1, 2],
                events: [
                    {id: 1, durationDays: 10},
                    {id: 2, durationDays: 20},
                ],
                dependencies: [],
            };

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({
                1: {1: 10, 2: null},
                2: {1: null, 2: 20},
            });
        });

        it('with no vertexes and no dependencies should generate empty adjacency matrix', () => {
            const payload = {
                vertexes: [],
                events: [],
                dependencies: [],
            };

            const result = pipe.handle(payload, next);

            expect(result.adjacencyMatrix).toEqual({});
        });
    });
});
