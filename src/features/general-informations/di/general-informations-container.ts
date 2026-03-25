import {ContainerModule} from "inversify";
import {
    SelectionProcessDatasource,
    SelectionProcessDatasourceContract
} from "../domain/datasources/selection-process-datasource-contract";
import {LocalSelectionProcessDatasource} from "../infrastructure/local-datasource";
import {
    SelectionProcessRepository,
    SelectionProcessRepositoryContract
} from "../domain/repositories/selection-process-repository-contract";
import {LocalSelectionProcessRepository} from "../infrastructure/local-selection-process-repository";

export const generalInformationsModule = new ContainerModule((bind) => {
    // Data Sources
    bind<SelectionProcessDatasourceContract>(SelectionProcessDatasource).to(LocalSelectionProcessDatasource).inSingletonScope();

    // Repositories
    bind<SelectionProcessRepositoryContract>(SelectionProcessRepository).to(LocalSelectionProcessRepository).inSingletonScope();
});
