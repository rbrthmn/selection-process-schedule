import {injectable, inject} from 'inversify';
import {Event} from '../entities/event';
import {Pipeline} from '../../../../core/services/pipeline';
import {Dependency} from "../entities/dependency";

export const ScheduleCalculatorSymbol = Symbol.for('ScheduleCalculatorSymbol');

export interface ScheduleCalculatorSymbolContract {
    calculateDatas(events: Event[], dependencies: Dependency[]): Object;
}

@injectable()
export class ScheduleValidator implements ScheduleCalculatorSymbolContract {
    constructor(@inject(Pipeline) private pipeline: Pipeline) {
    }

    calculateDatas(events: Event[], dependencies: Dependency[]): Object {
       return {}
    }
}
