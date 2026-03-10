import { ContainerModule } from 'inversify';
import {LocalScheduleDatasourceImpl} from "../infrastructure/local-datasource";
import {ScheduleRepositoryImpl} from "../infrastructure/repository";
import {CreateEvent, CreateEventUseCase, CreateEventUseCaseContract} from "../domain/usecases/create-event";
import {GetEvents, GetEventsUseCase, GetEventsUseCaseContract} from "../domain/usecases/get-events";
import "../presentation/controller";
import {ScheduleDatasource, ScheduleDatasourceContract} from "../domain/datasources/schedule-datasource-contract";
import {
  ScheduleRepository,
  ScheduleRepositoryContract,
} from "../domain/repositories/schedule-repository-contract";

export const scheduleModule = new ContainerModule((bind) => {
  // Data Sources
  bind<ScheduleDatasourceContract>(ScheduleDatasource).to(LocalScheduleDatasourceImpl).inSingletonScope();

  // Repositories
  bind<ScheduleRepositoryContract>(ScheduleRepository).to(ScheduleRepositoryImpl).inSingletonScope();

  // Use Cases
  bind<CreateEventUseCaseContract>(CreateEventUseCase).to(CreateEvent);
  bind<GetEventsUseCaseContract>(GetEventsUseCase).to(GetEvents);
});
