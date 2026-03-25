import { FilterInactiveEvents } from '../../../../../src/features/schedule/domain/pipes/filter-inactive-events';
import {describe, it, expect, beforeEach} from '@jest/globals';
import {next} from "../../../../utils";

describe('FilterInactiveEvents', () => {
    let pipe: FilterInactiveEvents;

    beforeEach(() => {
        pipe = new FilterInactiveEvents();
    });

    describe('handle', () => {
        it('with a mix of active and inactive events should filter out inactive events', () => {
            const payload = {
                events: [
                    { id: 1, isActive: true },
                    { id: 2, isActive: false },
                    { id: 3, isActive: true },
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([
                { id: 1, isActive: true },
                { id: 3, isActive: true },
            ]);
        });

        it('with only active events should not change the events array', () => {
            const payload = {
                events: [
                    { id: 1, isActive: true },
                    { id: 2, isActive: true },
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([
                { id: 1, isActive: true },
                { id: 2, isActive: true },
            ]);
        });

        it('with only inactive events should result in an empty events array', () => {
            const payload = {
                events: [
                    { id: 1, isActive: false },
                    { id: 2, isActive: false },
                ],
            };

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([]);
        });

        it('with an empty events array should do nothing', () => {
            const payload = {
                events: [],
            };

            const result = pipe.handle(payload, next);

            expect(result.events).toEqual([]);
        });
    });
});
