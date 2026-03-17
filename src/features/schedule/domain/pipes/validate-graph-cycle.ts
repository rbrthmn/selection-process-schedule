import {Pipe} from "../../../../core/services/pipe";
import {hasCycle} from "../../../../core/algorithms/hasCycle";

/**
 * @class ValidateGraphCycle
 * @implements {Pipe}
 * @description Pipe for validating if a graph contains a cycle.
 */
export class ValidateGraphCycle implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing the graph.
     * @param {(payload: any) => any} _next - The next pipe in the chain.
     * @returns {any} True if a cycle is detected, false otherwise.
     * @description Checks the graph in the payload for cyclic dependencies using the `hasCycle` algorithm.
     */
    handle(payload: any, _next: (payload: any) => any): any {
        return hasCycle(payload.graph);
    }
}
