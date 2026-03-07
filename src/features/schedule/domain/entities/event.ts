export class Event {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public initialDate: Date,
        public endDate: Date,
        public dependencies: Event[],
        public durationDays: number,
    ) {
    }
}
