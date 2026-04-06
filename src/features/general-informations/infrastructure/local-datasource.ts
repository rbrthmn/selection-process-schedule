import {injectable} from 'inversify';
import {SelectionProcessDatasourceContract} from '../domain/datasources/selection-process-datasource-contract';
import {SelectionProcess} from '../domain/entities/selection-process';
import {BaseLocalDatasource} from "../../../core/infrastructure/base-local-datasource";

interface SelectionProcessData {
    selectionProcesses: SelectionProcess[];
}

@injectable()
export class LocalSelectionProcessDatasource extends BaseLocalDatasource<SelectionProcessData> implements SelectionProcessDatasourceContract {
    constructor() {
        super('mock-data.json', 'mock-data-example.json', {selectionProcesses: []});
    }

    protected mapData(parsedData: any): SelectionProcessData {
        const selectionProcesses = (parsedData['selection-processes'] || []).map((sp: any) => new SelectionProcess(sp.id, sp.name, sp.initialDate));
        return {selectionProcesses};
    }

    getSelectionProcess(id: string): SelectionProcess | null {
        const found = this.data.selectionProcesses.find(sp => sp.id === id);
        return found ? new SelectionProcess(found.id, found.name, found.initialDate) : null;
    }
}
