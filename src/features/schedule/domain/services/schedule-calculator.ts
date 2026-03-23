import {injectable, inject} from 'inversify';
import {Event} from '../entities/event';
import {Pipeline} from '../../../../core/services/pipeline';
import {Dependency} from "../entities/dependency";
import {GenerateAdjacencyMatrix} from "../pipes/generate-adjacency-matrix";
import {InitVertexesAndEdges} from "../pipes/init-vertexes-and-edges";
import {GenerateVertexesWeights} from "../pipes/generate-vertexes-weights";

export const ScheduleCalculatorSymbol = Symbol.for('ScheduleCalculatorSymbol');

export interface ScheduleCalculatorContract {
    calculateDates(initialDate: string, events: Event[], dependencies: Dependency[]): Object;
}

@injectable()
export class ScheduleValidator implements ScheduleCalculatorContract {
    constructor(@inject(Pipeline) private pipeline: Pipeline) {
    }

    calculateDates(initialDate: string, events: Event[], dependencies: Dependency[]): Object {
        const payload = {
            initialDate: initialDate,
            events: events,
            dependencies: dependencies,
            vertexes: null,
            edges: null,
            matrix: null,
            vertexesWeights: null
        };

        return this.pipeline
            .through([
                new InitVertexesAndEdges(),
                new GenerateVertexesWeights(),
                new GenerateAdjacencyMatrix(),
            ])
            .send(payload);
    }
}
