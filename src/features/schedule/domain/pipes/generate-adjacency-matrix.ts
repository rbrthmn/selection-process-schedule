import {Pipe} from "../../../../core/services/pipe";
import {Dependency} from "../entities/dependency";

/**
 * @class GenerateAdjacencyMatrix
 * @implements {Pipe}
 * @description Pipe for generating an adjacency matrix with weights from events and dependencies.
 */
export class GenerateAdjacencyMatrix implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing vertexes and dependencies.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Generates an adjacency matrix where M[i][j] represents the dislocation days (weight)
     * between event i (previous) and event j (next).
     */
    handle(payload: any, next: (payload: any) => any): any {
        const vertexes: number[] = payload.vertexes;
        const dependencies: Dependency[] = payload.dependencies;

        const matrix: Record<number, Record<number, number | null>> = {};

        vertexes.forEach(source => {
            matrix[source] = {};
            vertexes.forEach(target => {
                matrix[source][target] = null;
            });
        });

        dependencies.forEach(dep => {
            const from = Number(dep.previousEventId);
            const to = Number(dep.eventId);
            const weight = dep.dislocationDays;

            if (matrix[from] && matrix[from][to] !== undefined) {
                matrix[from][to] = weight;
            }
        });

        payload.adjacencyMatrix = matrix;
        console.log(matrix)
        return next(payload);
    }
}
