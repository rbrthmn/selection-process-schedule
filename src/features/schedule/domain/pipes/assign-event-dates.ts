import {Pipe} from "../../../../core/services/pipe";
import {Event} from "../entities/event";

/**
 * @class AssignEventDates
 * @implements {Pipe}
 * @description Pipe that assigns calculated start and end dates to events based on their weights and the schedule's initial date.
 * This is the final step in the schedule calculation pipeline.
 */
export class AssignEventDates implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing the initial date, weights, and events.
     * @param {(payload: any) => any} next - Not used, as this is the final pipe.
     * @returns {Event[]} The list of events with updated dates.
     */
    handle(payload: any, next: (payload: any) => any): Event[] {
        const initialDateStr = payload.initialDate;
        const weights: Record<number, [number, number]> = payload.weights;
        const events: Event[] = payload.events;

        if (!initialDateStr) throw new Error("Initial date is required in the payload.");

        const initialDate = new Date(initialDateStr);

        events.forEach(event => {
            const eventWeights = weights[Number(event.id)];

            if (eventWeights) {
                const [startOffset, endOffset] = eventWeights;

                const startDate = this.addDays(initialDate, startOffset);
                const endDate = this.addDays(initialDate, endOffset);

                event.initialDate = startDate.toISOString().split('T')[0];
                event.endDate = endDate.toISOString().split('T')[0];
            }
        });

        return events;
    }

    /**
     * @method addDays
     * @param {Date} date - The base date.
     * @param {number} days - The number of days to add.
     * @returns {Date} A new Date object with the added days.
     */
    private addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);

        return result;
    }
}
