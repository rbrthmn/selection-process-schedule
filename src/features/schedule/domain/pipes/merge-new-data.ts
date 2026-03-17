import {Pipe} from "../../../../core/services/pipe";

/**
 * @class MergeNewData
 * @implements {Pipe}
 * @description Pipe for merging new event data, specifically dependencies, into the existing payload.
 */
export class MergeNewData implements Pipe {
    /**
     * @method handle
     * @param {any} payload - The payload containing existing data and potentially new data.
     * @param {(payload: any) => any} next - The next pipe in the chain.
     * @returns {any} The result of the next pipe.
     * @description Merges new event dependencies from `payload.newData` into `payload.edges`.
     */
    handle(payload: any, next: (payload: any) => any): any {
        const { newData } = payload['newData'];

        if (newData && newData.id) {
            if (Array.isArray(newData.dependencies)) {
                payload.edges = payload.edges.filter((edge: number[]) => edge[0] !== Number(newData.id));

                newData.dependencies.forEach((depId: string) => {
                    payload.edges.push([Number(newData.id), Number(depId)]);
                });
            }
        }

        return next(payload);
    }
}
