import {injectable, inject} from 'inversify';
import {Event} from '../entities/event';
import {Pipeline} from '../../../../core/services/pipeline';
import {Dependency} from "../entities/dependency";
import {GenerateAdjacencyMatrix} from "../pipes/generate-adjacency-matrix";
import {InitVertexesAndEdges} from "../pipes/init-vertexes-and-edges";
import {CalculateWeights} from "../pipes/calculate-weights";
import {AssignEventDates} from "../pipes/assign-event-dates";

export const ScheduleCalculatorSymbol = Symbol.for('ScheduleCalculatorSymbol');

export interface ScheduleCalculatorContract {
    calculateDates(initialDate: string | null, events: Event[], dependencies: Dependency[]): Object;
}

@injectable()
export class ScheduleCalculator implements ScheduleCalculatorContract {
    constructor(@inject(Pipeline) private pipeline: Pipeline) {
    }

    calculateDates(initialDate: string, events: Event[], dependencies: Dependency[]): Object {
        const payload = {
            initialDate: initialDate,
            events: events,
            dependencies: dependencies,
            vertexes: null,
            edges: null,
            adjacencyMatrix: null,
            weights: null
        };

        return this.pipeline
            .through([
                new InitVertexesAndEdges(),
                new GenerateAdjacencyMatrix(),
                new CalculateWeights(),
                new AssignEventDates()
            ])
            .send(payload);
    }
}
