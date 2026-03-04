import {Router} from 'express';
import {ScheduleRoutes} from './features/schedule/presentation/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/schedule', ScheduleRoutes.routes);

        return router;
    }
}
