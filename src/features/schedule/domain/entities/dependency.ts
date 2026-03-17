export class Dependency {
    constructor(
        public eventId: string,
        public previousEventId: string,
        public dislocationDays: number
    ) {
    }
}
