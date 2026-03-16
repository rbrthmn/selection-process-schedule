import { FilterInactiveEvents } from '../../../../../src/features/schedule/domain/pipes/filter-inactive-events';
import {describe, it, expect} from '@jest/globals';

describe('FilterInactiveEvents', () => {
    describe('handle', () => {
        it('with a mix of active and inactive events should filter out inactive events', () => {
            const pipe = new FilterInactiveEvents();
            const payload = {
                events: [
                    { id: 1, isActive: true },
                    { id: 2, isActive: false },
                    { id: 3, isActive: true },
                ],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([
                { id: 1, isActive: true },
                { id: 3, isActive: true },
            ]);
        });

        it('with only active events should not change the events array', () => {
            const pipe = new FilterInactiveEvents();
            const payload = {
                events: [
                    { id: 1, isActive: true },
                    { id: 2, isActive: true },
                ],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([
                { id: 1, isActive: true },
                { id: 2, isActive: true },
            ]);
        });

        it('with only inactive events should result in an empty events array', () => {
            const pipe = new FilterInactiveEvents();
            const payload = {
                events: [
                    { id: 1, isActive: false },
                    { id: 2, isActive: false },
                ],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([]);
        });

        it('with an empty events array should do nothing', () => {
            const pipe = new FilterInactiveEvents();
            const payload = {
                events: [],
            };
            const next = (p: any) => p;

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([]);
        });
    });
});
