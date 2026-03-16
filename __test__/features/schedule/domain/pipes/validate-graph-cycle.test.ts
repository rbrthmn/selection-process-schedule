import { ValidateGraphCycle } from '../../../../../src/features/schedule/domain/pipes/validate-graph-cycle';
import {describe, it, expect, jest} from '@jest/globals';

describe('ValidateGraphCycle', () => {
    describe('handle', () => {
        it('with a graph containing a cycle should return true', () => {
            const pipe = new ValidateGraphCycle();
            const payload = {
                graph: {
                    1: [2],
                    2: [1],
                },
            };
            const next = jest.fn();

            const result = pipe.handle(payload, next);

            expect(result).toBe(true);
            expect(next).not.toHaveBeenCalled();
        });

        it('with an acyclic graph should return false', () => {
            const pipe = new ValidateGraphCycle();
            const payload = {
                graph: {
                    1: [2],
                    2: [],
                },
            };
            const next = jest.fn();

            const result = pipe.handle(payload, next);

            expect(result).toBe(false);
            expect(next).not.toHaveBeenCalled();
        });

        it('with an empty graph should return false', () => {
            const pipe = new ValidateGraphCycle();
            const payload = {
                graph: {},
            };
            const next = jest.fn();

            const result = pipe.handle(payload, next);

            expect(result).toBe(false);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
