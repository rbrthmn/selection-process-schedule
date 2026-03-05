import {Container} from 'inversify';
import {TYPES} from './core/types';
import {ScheduleDatasource} from './features/schedule/domain/datasources/schedule.datasource';
import {LocalScheduleDatasourceImpl} from './features/schedule/infrastructure/local.datasource.impl';
import {ScheduleRepository} from './features/schedule/domain/repositories/schedule.repository';
import {ScheduleRepositoryImpl} from './features/schedule/infrastructure/repository.impl';
import {CreateEvent, CreateEventUseCase} from './features/schedule/domain/usecases/create-event';
import {GetEvents, GetEventsUseCase} from './features/schedule/domain/usecases/get-events';
import {CreateDependency, CreateDependencyUseCase} from './features/schedule/domain/usecases/create-dependency';
import {GetDependencies, GetDependenciesUseCase} from './features/schedule/domain/usecases/get-dependencies';
import './features/schedule/presentation/controller'; // Import controller to register it

const container = new Container();

// Data Sources
container.bind<ScheduleDatasource>(TYPES.ScheduleDatasource).to(LocalScheduleDatasourceImpl).inSingletonScope();

// Repositories
container.bind<ScheduleRepository>(TYPES.ScheduleRepository).to(ScheduleRepositoryImpl).inSingletonScope();

// Use Cases
container.bind<CreateEventUseCase>(TYPES.CreateEventUseCase).to(CreateEvent);
container.bind<GetEventsUseCase>(TYPES.GetEventsUseCase).to(GetEvents);
container.bind<CreateDependencyUseCase>(TYPES.CreateDependencyUseCase).to(CreateDependency);
container.bind<GetDependenciesUseCase>(TYPES.GetDependenciesUseCase).to(GetDependencies);

export {container};
