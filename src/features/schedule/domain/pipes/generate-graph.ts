import {Pipe} from "../../../../core/services/pipe";

export class GenerateGraph implements Pipe {
    handle(payload: any, next: (payload: any) => any): any {
        const graph = Object.fromEntries(
            payload.vertexes.map((vertex: string) => [vertex, []])
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
