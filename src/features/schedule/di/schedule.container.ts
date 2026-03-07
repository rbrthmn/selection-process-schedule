import { ContainerModule } from 'inversify';
import {ScheduleDatasource} from "../domain/datasources/schedule-datasource";
import {TYPES} from "../../../core/types";
import {LocalScheduleDatasourceImpl} from "../infrastructure/local.datasource.impl";
import {ScheduleRepositoryImpl} from "../infrastructure/repository.impl";
import {ScheduleRepository} from "../domain/repositories/schedule-repository";
import {CreateEvent, CreateEventUseCase} from "../domain/usecases/create-event";
import {GetEvents, GetEventsUseCase} from "../domain/usecases/get-events";
import {CreateDependency, CreateDependencyUseCase} from "../domain/usecases/create-dependency";
import {GetDependencies, GetDependenciesUseCase} from "../domain/usecases/get-dependencies";
import "../presentation/controller";

export const scheduleModule = new ContainerModule((bind) => {
  // Data Sources
  bind<ScheduleDatasource>(TYPES.ScheduleDatasource).to(LocalScheduleDatasourceImpl).inSingletonScope();

  // Repositories
  bind<ScheduleRepository>(TYPES.ScheduleRepository).to(ScheduleRepositoryImpl).inSingletonScope();

  // Use Cases
  bind<CreateEventUseCase>(TYPES.CreateEventUseCase).to(CreateEvent);
  bind<GetEventsUseCase>(TYPES.GetEventsUseCase).to(GetEvents);
  bind<CreateDependencyUseCase>(TYPES.CreateDependencyUseCase).to(CreateDependency);
  bind<GetDependenciesUseCase>(TYPES.GetDependenciesUseCase).to(GetDependencies);
});
