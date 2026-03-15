import {Pipe} from "../../../../core/services/pipe";

export class FilterInactiveEvents implements Pipe {
    handle(payload: any, next: (payload: any) => any): any {
        payload.events = payload.events.filter((event: any) => event.isActive === true);

        return next(payload);
    }
}
