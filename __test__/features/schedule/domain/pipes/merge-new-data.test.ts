import { MergeNewData } from '../../../../../src/features/schedule/domain/pipes/merge-new-data';
import {describe, it, expect, beforeEach} from '@jest/globals';
import {next} from "../../../../utils";

describe('MergeNewData', () => {
    let pipe: MergeNewData;

    beforeEach(() => {
        pipe = new MergeNewData();
    });

    describe('handle', () => {
        it('with new dependencies should replace existing dependencies for the given event', () => {
            const payload = {
                edges: [
                    [1, 2], 
                    [3, 4],
                ],
                newData: {
                    newData: {
                        id: '1',
                        dependencies: ['3', '4'],
                    },
                },
            };

            const result = pipe.handle(payload, next);

            expect(result.edges).toEqual(expect.arrayContaining([
                [3, 4],
                [1, 3],
                [1, 4],
            ]));
            expect(result.edges).not.toContainEqual([1, 2]);
        });

        it('with an empty dependencies array should remove all dependencies for the given event', () => {
            const payload = {
                edges: [
                    [1, 2],
                    [3, 4],
                ],
                newData: {
                    newData: {
                        id: '1',
                        dependencies: [],
                    },
                },
            };

            const result = pipe.handle(payload, next);

            expect(result.edges).toEqual([[3, 4]]);
        });

        it('with no newData should not modify the edges', () => {
            const payload = {
                edges: [
                    [1, 2],
                    [3, 4],
                ],
                newData: {},
            };

            const result = pipe.handle(payload, next);

            expect(result.edges).toEqual([
                [1, 2],
                [3, 4],
            ]);
        });

        it('with newData but no dependencies array should not modify the edges', () => {
            const payload = {
                edges: [
                    [1, 2],
                    [3, 4],
                ],
                newData: {
                    newData: {
                        id: '1',
                    },
                },
            };

            const result = pipe.handle(payload, next);

            expect(result.edges).toEqual([
                [1, 2],
                [3, 4],
            ]);
        });
    });
});
