import { InitVertexesAndEdges } from '../../../../../src/features/schedule/domain/pipes/init-vertexes-and-edges';
import {describe, it, expect} from '@jest/globals';

describe('InitVertexesAndEdges', () => {
    describe('handle', () => {
        it('with events and dependencies should initialize vertexes and edges', () => {
            const pipe = new InitVertexesAndEdges();
            const payload = {
                events: [
                    { id: '1' },
                    { id: '2' },
                    { id: '3' },
                ],
                dependencies: [
                    { eventId: '1', previousEventId: '2' },
                    { eventId: '2', previousEventId: '3' },
                ],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.vertexes).toEqual([1, 2, 3]);
            expect(result.edges).toEqual([
                [1, 2],
                [2, 3],
            ]);
        });

        it('with events but no dependencies should initialize vertexes and an empty edges array', () => {
            const pipe = new InitVertexesAndEdges();
            const payload = {
                events: [
                    { id: '1' },
                    { id: '2' },
                ],
                dependencies: [],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.vertexes).toEqual([1, 2]);
            expect(result.edges).toEqual([]);
        });

        it('with no events and no dependencies should initialize empty vertexes and edges arrays', () => {
            const pipe = new InitVertexesAndEdges();
            const payload = {
                events: [],
                dependencies: [],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.vertexes).toEqual([]);
            expect(result.edges).toEqual([]);
        });
    });
});
