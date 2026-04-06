import {describe, it, expect, beforeEach} from '@jest/globals';
import {AssignEventDates} from "../../../../../src/features/schedule/domain/pipes/assign-event-dates";
import {Event} from "../../../../../src/features/schedule/domain/entities/event";
import {next} from "../../../../utils";

describe('AssignEventDates', () => {
    let pipe: AssignEventDates;

    beforeEach(() => {
        pipe = new AssignEventDates();
    });

    describe('handle', () => {
        it('with initial date and weights should assign start and end dates to events', () => {
            const events = [
                new Event('1', 'proc1', 'Event 1', 'type1', null, null, 10, true),
                new Event('2', 'proc1', 'Event 2', 'type1', null, null, 20, true)
            ];
            const payload = {
                initialDate: '2023-01-01',
                weights: {
                    1: [0, 10],
                    2: [15, 35]
                },
                events: events
            };

            const result = pipe.handle(payload, next);

            expect(result[0].initialDate).toBe('2023-01-01');
            expect(result[0].endDate).toBe('2023-01-11');
            expect(result[1].initialDate).toBe('2023-01-16');
            expect(result[1].endDate).toBe('2023-02-05');
        });

        it('without initial date should throw error', () => {
            const payload = {
                weights: {},
                events: []
            };

            expect(() => pipe.handle(payload, next)).toThrow("Initial date is required in the payload.");
        });

        it('with events without corresponding weights should not assign dates', () => {
            const events = [
                new Event('1', 'proc1', 'Event 1', 'type1', null, null, 10, true)
            ];
            const payload = {
                initialDate: '2023-01-01',
                weights: {}, 
                events: events
            };

            const result = pipe.handle(payload, next);

            expect(result[0].initialDate).toBeNull();
            expect(result[0].endDate).toBeNull();
        });
    });
});
