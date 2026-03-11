export class Event {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public initialDate: string|null,
        public endDate: string|null,
        public dependencies: EventType[],
        public durationDays: number,
    ) {
    }
}

export type EventType = Event