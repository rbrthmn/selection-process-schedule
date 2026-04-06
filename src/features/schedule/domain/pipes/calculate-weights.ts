import {Pipe} from "../../../../core/services/pipe";
import {calculatePathWeights} from "../../../../core/algorithms/calculatePathWeights";

/**
 * @class CalculateWeights
 * @implements {Pipe}
 * @description Pipe that calculates the start and end weights (accumulated duration) for each vertex in the schedule.
 * It uses the adjacency matrix from the payload to determine the longest path (critical path) to each event.
 */
export class CalculateWeights implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing the adjacency matrix.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe, with the 'weights' property added to the payload.
     * @description Invokes the calculatePathWeights algorithm to compute [incoming, total] weights for each vertex
     * and attaches the result to payload.weights.
     */
    handle(payload: any, next: (payload: any) => any): any {
        payload.weights = calculatePathWeights(payload.adjacencyMatrix)

        return next(payload);
    }
}
