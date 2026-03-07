import {EventType} from "./event";

export class Dependency {
    constructor(
        public id: string,
        public event: EventType,
        public previousEvent: EventType,
        public dislocationDays: number
    ) {
    }
}

export type DependencyType = Dependency