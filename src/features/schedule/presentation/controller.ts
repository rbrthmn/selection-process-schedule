import e, {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import {EventEntity} from '../domain/entities/event.entity';
import {DependencyEntity} from '../domain/entities/dependency.entity';
import {controller, httpPost, httpGet} from 'inversify-express-utils';
import {inject} from 'inversify';
import {TYPES} from "../../../core/types";
import {CreateEventUseCase} from "../domain/usecases/CreateEvent";
import {GetEventsUseCase} from "../domain/usecases/GetEvents";
import {CreateDependencyUseCase} from "../domain/usecases/CreateDependency";
import {GetDependenciesUseCase} from "../domain/usecases/GetDependencies";
import {AppError} from "../../../core/errors/custom.error";

const createEventSchema = z.object({
    name: z.string().min(1, 'Event name is required'),
    duration: z.number().int().positive('Duration must be a positive integer'),
});

const createDependencySchema = z.object({
    source: z.string().min(1, 'Source event name is required'),
    target: z.string().min(1, 'Target event name is required'),
});

@controller('/schedule')
export class ScheduleController {
    constructor(
        @inject(TYPES.CreateEventUseCase) private readonly createEventUseCase: CreateEventUseCase,
        @inject(TYPES.GetEventsUseCase) private readonly getEventsUseCase: GetEventsUseCase,
        @inject(TYPES.CreateDependencyUseCase) private readonly createDependencyUseCase: CreateDependencyUseCase,
        @inject(TYPES.GetDependenciesUseCase) private readonly getDependenciesUseCase: GetDependenciesUseCase
    ) {
    }

    @httpPost('/events')
    public async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = createEventSchema.parse(req.body);
            const newEvent = this.createEventUseCase.execute(new EventEntity(validatedData.name, validatedData.duration));
            res.status(201).json(newEvent);
        } catch (error: any) {
            this.handleError(error, next)
        }
    }

    @httpGet('/events')
    public async getEvents(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const events = this.getEventsUseCase.execute();
            res.status(200).json(events);
        } catch (error: any) {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    }

    @httpPost('/dependencies')
    public async createDependency(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = createDependencySchema.parse(req.body);
            const newDependency = this.createDependencyUseCase.execute(new DependencyEntity(validatedData.source, validatedData.target));
            res.status(201).json(newDependency);
        } catch (error: any) {
            this.handleError(error, next);
        }
    };

    private handleError(error: any, next: e.NextFunction) {
        if (error instanceof z.ZodError) {
            next(AppError.badRequest('Validation Error', error.errors.map(err => ({
                fields: [err.path.join('.')],
                constraint: err.message
            }))));
        } else if (error instanceof AppError) {
            next(error);
        } else {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    }

    @httpGet('/dependencies')
    public async getDependencies(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dependencies = this.getDependenciesUseCase.execute();
            res.status(200).json(dependencies);
        } catch (error: any) {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    }
}
