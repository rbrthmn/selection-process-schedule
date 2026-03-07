import {AppError} from "../../../../core/errors/custom-error";

export class Event {
    constructor(
        public name: string,
        public duration: number
    ) {
    }

    public static fromJson(obj: Record<string, unknown>): Event {
        const {name, duration} = obj;
        if (!name) {
            throw AppError.badRequest('This entity requires a name', [{
                constraint: 'name is required',
                fields: ['name']
            }]);
        }
        if (duration === undefined || duration === null) {
            throw AppError.badRequest('This entity requires a duration', [{
                constraint: 'duration is required',
                fields: ['duration']
            }]);
        }
        return new Event(name as string, duration as number);
    }
}
