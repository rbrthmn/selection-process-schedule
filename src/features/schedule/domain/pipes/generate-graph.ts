import {Pipe} from "../../../../core/services/pipe";

/**
 * @class GenerateGraph
 * @implements {Pipe}
 * @description Pipe for generating a graph representation from vertexes and edges.
 */
export class GenerateGraph implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing vertexes and edges.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Generates an adjacency list graph from the provided vertexes and edges in the payload.
     */
    handle(payload: any, next: (payload: any) => any): any {
        const graph = Object.fromEntries(
            payload.vertexes.map((vertex: number) => [vertex, []])
        );

        for (const edge of payload.edges) {
            if (graph[edge[0]]) {
                graph[edge[0]].push(edge[1]);
            }
        }

        payload.graph = graph;

        return next(payload);
    }
}
