export class Event {
    constructor(
        public id: string,
        public selectionProcessId: string,
        public name: string,
        public type: string,
        public initialDate: string|null,
        public endDate: string|null,
        public durationDays: number,
    ) {
    }
}
