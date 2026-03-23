import {Pipe} from "../../../../core/services/pipe";

/**
 * @class GenerateVertexesWeights
 * @implements {Pipe}
 * @description Pipe for generating a mapping of vertex weights based on event durations.
 */
export class GenerateVertexesWeights implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing the list of events.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Extracts the duration of each event and stores it in `payload.vertexesWeights`
     * as a dictionary where the key is the event ID and the value is the duration in days.
     */
    handle(payload: any, next: (payload: any) => any): any {
        const vertexesWeights: Record<number, number | null> = {}
        const events: any[] = payload.events;

        events.forEach(event => {
            vertexesWeights[Number(event.id)] = event.durationDays;
        })

        payload.vertexesWeights = vertexesWeights;

        return next(payload);
    }
}
