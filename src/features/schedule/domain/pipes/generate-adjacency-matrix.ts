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
        const events: any[] = payload.events;

        const matrix: Record<number, Record<number, number | null>> = {};

        vertexes.forEach(target => {
            matrix[target] = {};
            vertexes.forEach(source => {
                matrix[target][source] = null;

                if (target === source) {
                    matrix[target][source] = events.find(event => event.id == target)?.durationDays ?? null;
                }
            });
        });

        dependencies.forEach(dep => {
            const source = Number(dep.previousEventId);
            const target = Number(dep.eventId);

            if (matrix[target] && matrix[target][source] !== undefined) {
                matrix[target][source] = dep.dislocationDays;
            }
        });

        payload.adjacencyMatrix = matrix;
        return next(payload);
    }
}
