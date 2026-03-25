import {SelectionProcess} from "../entities/selection-process";

export const SelectionProcessDatasource = Symbol.for('SelectionProcessDatasource');

/**
 * @interface SelectionProcessDatasourceContract
 * @description Contract for the selection process datasource.
 */
export interface SelectionProcessDatasourceContract {
    /**
     * @method getSelectionProcess
     * @param {string} id - The ID of the selection process.
     * @returns {SelectionProcess | null} The selection process if found, or null.
     */
    getSelectionProcess(id: string): SelectionProcess | null;
}
