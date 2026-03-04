import e, {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import {EventEntity} from '../domain/entities/event.entity';
import {DependencyEntity} from '../domain/entities/dependency.entity';
import {CreateEvent} from '../domain/usecases/CreateEvent';
import {GetEvents} from "../domain/usecases/GetEvents";
import {GetDependencies} from "../domain/usecases/GetDependencies";
import {CreateDependency} from "../domain/usecases/CreateDependency";
import {AppError} from '../../../core/errors/custom.error';

const createEventSchema = z.object({
    name: z.string().min(1, 'Event name is required'),
    duration: z.number().int().positive('Duration must be a positive integer'),
});

const createDependencySchema = z.object({
    source: z.string().min(1, 'Source event name is required'),
    target: z.string().min(1, 'Target event name is required'),
});

export class ScheduleController {
    constructor(
        private readonly createEventUseCase: CreateEvent,
        private readonly getEventsUseCase: GetEvents,
        private readonly createDependencyUseCase: CreateDependency,
        private readonly getDependenciesUseCase: GetDependencies
    ) {
    }

    public createEvent = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validatedData = createEventSchema.parse(req.body);
            const newEvent = this.createEventUseCase.execute(new EventEntity(validatedData.name, validatedData.duration));
            res.status(201).json(newEvent);
        } catch (error: any) {
            this.handleError(error, next)
        }
    };

    public getEvents = (_req: Request, res: Response, next: NextFunction): void => {
        try {
            const events = this.getEventsUseCase.execute();
            res.status(200).json(events);
        } catch (error: any) {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    };

    public createDependency = (req: Request, res: Response, next: NextFunction): void => {
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

    public getDependencies = (_req: Request, res: Response, next: NextFunction): void => {
        try {
            const dependencies = this.getDependenciesUseCase.execute();
            res.status(200).json(dependencies);
        } catch (error: any) {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    };
}
