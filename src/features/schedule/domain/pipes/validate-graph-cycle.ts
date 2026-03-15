import {Pipe} from "../../../../core/services/pipe";
import {hasCycle} from "../../../../core/algorithms/hasCycle";

export class ValidateGraphCycle implements Pipe {
    handle(payload: any, _next: (payload: any) => any): any {
        return hasCycle(payload.graph);
    }
}
