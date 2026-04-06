import {SelectionProcess} from "../entities/selection-process";

export const SelectionProcessRepository = Symbol.for('SelectionProcessRepository');

/**
 * @interface SelectionProcessRepositoryContract
 * @description Contract for the selection process repository.
 */
export interface SelectionProcessRepositoryContract {
    /**
     * @method getSelectionProcess
     * @param {string} id - The ID of the selection process.
     * @returns {SelectionProcess | null} The selection process if found, or null.
     */
    getSelectionProcess(id: string): SelectionProcess | null;
}
