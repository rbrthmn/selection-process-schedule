import {Pipe} from "../../../../core/services/pipe";

/**
 * @class InitVertexesAndEdges
 * @implements {Pipe}
 * @description Pipe for initializing vertexes and edges from events and dependencies.
 */
export class InitVertexesAndEdges implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing events and dependencies.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Initializes the vertexes (event IDs) and edges (dependencies) in the payload.
     */
    handle(payload: any, next: (payload: any) => any): any {
        payload.vertexes = payload.events.map((evento: any) => Number(evento.id));
        payload.edges = payload.dependencies.map((dependency: any) => [Number(dependency.eventId), Number(dependency.previousEventId)]);

        return next(payload);
    }
}
