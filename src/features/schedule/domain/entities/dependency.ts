import {AppError} from "../../../../core/errors/custom-error";

export class Dependency {
    constructor(
        public source: string,
        public target: string
    ) {
    }

    public static fromJson(obj: Record<string, unknown>): Dependency {
        const {source, target} = obj;
        if (!source) {
            throw AppError.badRequest('This entity requires a source', [{
                constraint: 'source is required',
                fields: ['source']
            }]);
        }
        if (!target) {
            throw AppError.badRequest('This entity requires a target', [{
                constraint: 'target is required',
                fields: ['target']
            }]);
        }
        return new Dependency(source as string, target as string);
    }
}
