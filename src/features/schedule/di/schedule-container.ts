import { ContainerModule } from 'inversify';
import {LocalScheduleDatasourceImpl} from "../infrastructure/local-datasource";
import {ScheduleRepositoryImpl} from "../infrastructure/repository";
import {CreateEvent, CreateEventUseCase, CreateEventUseCaseContract} from "../domain/usecases/create-event";
import {GetEvents, GetEventsUseCase, GetEventsUseCaseContract} from "../domain/usecases/get-events";
import {EditEvent, EditEventUseCase, EditEventUseCaseContract} from "../domain/usecases/edit-event";
import {DeleteEvent, DeleteEventUseCase, DeleteEventUseCaseContract} from "../domain/usecases/delete-event";
import {ScheduleDatasource, ScheduleDatasourceContract} from "../domain/datasources/schedule-datasource-contract";
import {
  ScheduleRepository,
  ScheduleRepositoryContract,
} from "../domain/repositories/schedule-repository-contract";
import "../presentation/controller";
import {EventValidator, EventValidatorContract, EventValidatorSymbol} from "../domain/services/event-validator";
import {
  ScheduleCalculatorContract,
  ScheduleCalculatorSymbol,
  ScheduleCalculator
} from "../domain/services/schedule-calculator";

export const scheduleModule = new ContainerModule((bind) => {
  // Data Sources
  bind<ScheduleDatasourceContract>(ScheduleDatasource).to(LocalScheduleDatasourceImpl).inSingletonScope();

  // Repositories
  bind<ScheduleRepositoryContract>(ScheduleRepository).to(ScheduleRepositoryImpl).inSingletonScope();

  // Use Cases
  bind<CreateEventUseCaseContract>(CreateEventUseCase).to(CreateEvent);
  bind<GetEventsUseCaseContract>(GetEventsUseCase).to(GetEvents);
  bind<EditEventUseCaseContract>(EditEventUseCase).to(EditEvent);
  bind<DeleteEventUseCaseContract>(DeleteEventUseCase).to(DeleteEvent);

  bind<EventValidatorContract>(EventValidatorSymbol).to(EventValidator).inSingletonScope();
  bind<ScheduleCalculatorContract>(ScheduleCalculatorSymbol).to(ScheduleCalculator).inSingletonScope();
});
