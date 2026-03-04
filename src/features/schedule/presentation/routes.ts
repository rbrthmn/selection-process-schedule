import {Router} from 'express';
import {ScheduleController} from './controller';
import {ScheduleRepositoryImpl} from '../infrastructure/repository.impl';
import {LocalScheduleDatasourceImpl} from '../infrastructure/local.datasource.impl';
import {CreateEvent} from "../domain/usecases/CreateEvent";
import {GetEvents} from "../domain/usecases/GetEvents";
import {CreateDependency} from "../domain/usecases/CreateDependency";
import {GetDependencies} from "../domain/usecases/GetDependencies";

export class ScheduleRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new LocalScheduleDatasourceImpl();
        const repository = new ScheduleRepositoryImpl(datasource);

        const createEventUseCase = new CreateEvent(repository);
        const getEventsUseCase = new GetEvents(repository);
        const createDependencyUseCase = new CreateDependency(repository);
        const getDependenciesUseCase = new GetDependencies(repository);

        const controller = new ScheduleController(
            createEventUseCase,
            getEventsUseCase,
            createDependencyUseCase,
            getDependenciesUseCase
        );

        router.post('/events', controller.createEvent);
        router.get('/events', controller.getEvents);
        router.post('/dependencies', controller.createDependency);
        router.get('/dependencies', controller.getDependencies);

        return router;
    }
}
