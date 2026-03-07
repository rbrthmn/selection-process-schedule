import {Event} from "./event";

export class Schedule {
    constructor(
        public id: string,
        public initialDate: string,
        public events: Event[]
    ) {
    }
}
