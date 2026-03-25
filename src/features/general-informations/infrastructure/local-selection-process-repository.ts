import {injectable, inject} from 'inversify';
import {SelectionProcessRepositoryContract} from '../domain/repositories/selection-process-repository-contract';
import {SelectionProcessDatasource, SelectionProcessDatasourceContract} from '../domain/datasources/selection-process-datasource-contract';
import {SelectionProcess} from "../domain/entities/selection-process";

@injectable()
export class LocalSelectionProcessRepository implements SelectionProcessRepositoryContract {
    constructor(@inject(SelectionProcessDatasource) private readonly datasource: SelectionProcessDatasourceContract) {
    }

    getSelectionProcess(id: string): SelectionProcess | null {
        return this.datasource.getSelectionProcess(id);
    }
}
