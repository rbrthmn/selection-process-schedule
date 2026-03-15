import {Pipe} from "../../../../core/services/pipe";

export class ValidateGraphCycle implements Pipe {
    handle(payload: any, next: (payload: any) => any): any {
        return next(payload);
    }
}
