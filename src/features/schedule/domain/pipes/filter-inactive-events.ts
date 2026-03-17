import {Pipe} from "../../../../core/services/pipe";

/**
 * @class FilterInactiveEvents
 * @implements {Pipe}
 * @description Pipe for filtering out inactive events from the payload.
 */
export class FilterInactiveEvents implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload to be processed.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Filters the events in the payload, keeping only the active ones.
     */
    handle(payload: any, next: (payload: any) => any): any {
        payload.events = payload.events.filter((event: any) => event.isActive === true);

        return next(payload);
    }
}
