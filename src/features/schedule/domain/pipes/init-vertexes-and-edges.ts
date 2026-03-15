import {Pipe} from "../../../../core/services/pipe";

export class InitVertexesAndEdges implements Pipe {
    handle(payload: any, next: (payload: any) => any): any {
        payload.vertexes = payload.events.map((evento: any) => evento.id);
        payload.edges = payload.dependencies.map((dependency: any) => [dependency.eventId, dependency.previousEventId]);

        return next(payload);
    }
}
