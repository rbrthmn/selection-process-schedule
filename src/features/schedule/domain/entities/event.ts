export class Event {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public initialDate: string,
        public endDate: string,
        public dependencies: EventType[],
        public durationDays: number,
    ) {
    }
}

export type EventType = Event