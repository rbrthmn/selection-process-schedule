import {Pipe} from "../../../../core/services/pipe";

export class InitVertexesAndEdges implements Pipe {
    handle(payload: any, next: (payload: any) => any): any {
        payload.vertexes = payload.events.map((evento: any) => Number(evento.id));
        payload.edges = payload.dependencies.map((dependency: any) => [Number(dependency.eventId), Number(dependency.previousEventId)]);

        return next(payload);
    }
}
