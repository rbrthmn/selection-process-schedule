import e, {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import {controller, httpPost, httpGet} from 'inversify-express-utils';
import {inject} from 'inversify';
import {TYPES} from "../../../core/types";
import {CreateEventUseCase, CreateEventUseCaseContract} from "../domain/usecases/create-event";
import {GetEventsUseCase} from "../domain/usecases/get-events";
import {CreateDependencyUseCase} from "../domain/usecases/create-dependency";
import {GetDependenciesUseCase} from "../domain/usecases/get-dependencies";
import {AppError} from "../../../core/errors/custom-error";
import {isHttpError} from "http-errors";
import {Event} from "../domain/entities/event";
import {Schedule} from "../domain/entities/schedule";

const createEventSchema = z.object({
    name: z.string().min(1, 'Event name is required'),
    type: z.string().min(1, 'Event type is required'),
    initialDate: z.string().datetime(),
    endDate: z.string().datetime(),
    durationDays: z.number().int().positive(),
});

const createDependencySchema = z.object({
    eventId: z.string().min(1, 'Event ID is required'),
    previousEventId: z.string().min(1, 'Previous event ID is required'),
    dislocationDays: z.number().int(),
});

interface ScheduleControllerContract {
    createEvent(req: Request, res: Response, next: NextFunction): Promise<void>
    getEvents(_req: Request, res: Response, next: NextFunction): Promise<void>
}

@controller('/schedule')
export class ScheduleController implements ScheduleControllerContract {
    constructor(
        @inject(CreateEventUseCase) private readonly createEventUseCase: CreateEventUseCaseContract,
        @inject(TYPES.GetEventsUseCase) private readonly getEventsUseCase: GetEventsUseCase,
    ) {
    }

    @httpPost('/events')
    public async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = createEventSchema.parse(req.body);
            const newEvent = this.createEventUseCase.execute(new Event(
                '',
                validatedData.name,
                validatedData.type,
                validatedData.initialDate,
                validatedData.endDate,
                [],
                validatedData.durationDays
            ));
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

    private handleError(error: any, next: e.NextFunction) {
        if (error instanceof z.ZodError) {
            next(AppError.badRequest('Validation Error', error.errors.map(err => ({
                fields: [err.path.join('.')],
                constraint: err.message
            }))));
        } else if (isHttpError(error)) {
            next(error);
        } else {
            next(AppError.internalServer('An unexpected error occurred'));
        }
    }
}
