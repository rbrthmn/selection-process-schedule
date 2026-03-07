export class Dependency {
    constructor(
        public id: string,
        public event: Event,
        public previousEvent: Event,
        public dislocationDays: number
    ) {
    }
}
