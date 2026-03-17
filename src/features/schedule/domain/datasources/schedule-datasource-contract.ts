import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export const ScheduleDatasource = Symbol.for('ScheduleDatasource');

/**
 * @interface ScheduleDatasourceContract
 * @description Contract for the schedule datasource, defining methods for interacting with the data storage.
 */
export interface ScheduleDatasourceContract {
    /**
     * @method createEvent
     * @param {Event} event - The event to be created.
     * @returns {Event} The created event.
     * @description Persists a new event in the data source.
     */
    createEvent(event: Event): Event;

    /**
     * @method getEvents
     * @param {string} selectionProcessId - The ID of the selection process.
     * @returns {Event[]} An array of events.
     * @description Retrieves events for a specific selection process from the data source.
     */
    getEvents(selectionProcessId: string): Event[];

    /**
     * @method updateEvent
     * @param {Event} event - The event to be updated.
     * @returns {Event} The updated event.
     * @description Updates an existing event in the data source.
     */
    updateEvent(event: Event): Event;

    /**
     * @method deleteEvent
     * @param {string} id - The ID of the event to be deleted.
     * @returns {void}
     * @description Removes an event from the data source.
     */
    deleteEvent(id: string): void;

    /**
     * @method createDependency
     * @param {Dependency} dependency - The dependency to be created.
     * @returns {Dependency} The created dependency.
     * @description Persists a new dependency between events in the data source.
     */
    createDependency(dependency: Dependency): Dependency;

    /**
     * @method getDependencies
     * @param {string[]} eventsIds - An array of event IDs.
     * @returns {Dependency[]} An array of dependencies.
     * @description Retrieves dependencies associated with the given event IDs from the data source.
     */
    getDependencies(eventsIds: string[]): Dependency[];

    /**
     * @method deleteDependencies
     * @param {string} eventId - The ID of the event whose dependencies should be deleted.
     * @returns {void}
     * @description Removes dependencies associated with a specific event from the data source.
     */
    deleteDependencies(eventId: string): void;
}
