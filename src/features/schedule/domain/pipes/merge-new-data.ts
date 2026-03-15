import {Pipe} from "../../../../core/services/pipe";

export class MergeNewData implements Pipe {
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
