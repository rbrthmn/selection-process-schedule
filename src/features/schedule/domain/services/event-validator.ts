import {injectable, inject} from 'inversify';
import {Event} from '../entities/event';
import {Pipeline} from '../../../../core/services/pipeline';
import {InitVertexesAndEdges} from '../pipes/init-vertexes-and-edges';
import {GenerateGraph} from '../pipes/generate-graph';
import {ValidateGraphCycle} from '../pipes/validate-graph-cycle';
import {FilterInactiveEvents} from '../pipes/filter-inactive-events';
import {Dependency} from "../entities/dependency";
import {MergeNewData} from '../pipes/merge-new-data';

export const EventValidatorSymbol = Symbol.for('EventValidator');

export interface EventValidatorContract {
    hasCyclicDependency(newData: object, events: Event[], dependencies: Dependency[]): boolean;
}

@injectable()
export class EventValidator implements EventValidatorContract {
    constructor(@inject(Pipeline) private pipeline: Pipeline) {}

    hasCyclicDependency(newData: object, events: Event[], dependencies: Dependency[]): boolean {
        const payload = {
            newData: newData,
            events: events,
            dependencies: dependencies,
            vertexes: [],
            edges: [],
            graph: [],
        };

        return this.pipeline
            .through([
                new FilterInactiveEvents(),
                new InitVertexesAndEdges(),
                new MergeNewData(),
                new GenerateGraph(),
                new ValidateGraphCycle(),
            ])
            .send(payload);
    }
}
