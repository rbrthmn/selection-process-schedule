import {Event} from "../entities/event";
import {Dependency} from "../entities/dependency";

export const ScheduleRepository = Symbol.for('ScheduleRepository');

/**
 * @interface ScheduleRepositoryContract
 * @description Contract for the schedule repository, defining operations for managing events and dependencies.
 */
export interface ScheduleRepositoryContract {
    /**
     * @method createEvent
     * @param {Event} event - The event to be created.
     * @returns {Event} The created event.
     * @description Creates a new event in the repository.
     */
    createEvent(event: Event): Event;

    /**
     * @method getEvents
     * @param {string} selectionProcessId - The ID of the selection process.
     * @returns {Event[]} An array of events for the specified selection process.
     * @description Retrieves all events associated with a given selection process.
     */
    getEvents(selectionProcessId: string): Event[];

    /**
     * @method updateEvent
     * @param {Event} event - The event to be updated.
     * @returns {Event} The updated event.
     * @description Updates an existing event in the repository.
     */
    updateEvent(event: Event): Event;

    /**
     * @method deleteEvent
     * @param {string} id - The ID of the event to be deleted.
     * @returns {void}
     * @description Deletes an event from the repository by its ID.
     */
    deleteEvent(id: string): void;

    /**
     * @method createDependency
     * @param {Dependency} dependency - The dependency to be created.
     * @returns {Dependency} The created dependency.
     * @description Creates a new dependency between events.
     */
    createDependency(dependency: Dependency): Dependency;

    /**
     * @method deleteDependencies
     * @param {string} eventId - The ID of the event whose dependencies should be deleted.
     * @returns {void}
     * @description Deletes all dependencies associated with a specific event.
     */
    deleteDependencies(eventId: string): void;

    /**
     * @method getDependencies
     * @param {string[]} eventsIds - An array of event IDs.
     * @returns {Dependency[]} An array of dependencies associated with the given event IDs.
     * @description Retrieves all dependencies for a list of events.
     */
    getDependencies(eventsIds: string[]): Dependency[];
}
