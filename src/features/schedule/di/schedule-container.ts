import { ContainerModule } from 'inversify';
import {TYPES} from "../../../core/types";
import {LocalScheduleDatasourceImpl} from "../infrastructure/local-datasource";
import {ScheduleRepositoryImpl} from "../infrastructure/repository";
import {CreateEvent, CreateEventUseCase} from "../domain/usecases/create-event";
import {GetEvents, GetEventsUseCase} from "../domain/usecases/get-events";
import {CreateDependency, CreateDependencyUseCase} from "../domain/usecases/create-dependency";
import {GetDependencies, GetDependenciesUseCase} from "../domain/usecases/get-dependencies";
import "../presentation/controller";
import {ScheduleDatasource} from "../domain/datasources/schedule-datasource";
import {ScheduleRepository} from "../domain/repositories/schedule-repository";

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
