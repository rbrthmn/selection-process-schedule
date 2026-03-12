import e, {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import {controller, httpPost, httpGet, httpPut, httpDelete} from 'inversify-express-utils';
import {inject} from 'inversify';
import {CreateEventUseCase, CreateEventUseCaseContract} from "../domain/usecases/create-event";
import {GetEventsUseCase, GetEventsUseCaseContract} from "../domain/usecases/get-events";
import {EditEventUseCase, EditEventUseCaseContract} from "../domain/usecases/edit-event";
import {DeleteEventUseCase, DeleteEventUseCaseContract} from "../domain/usecases/delete-event";
import {AppError} from "../../../core/errors/custom-error";
import {isHttpError} from "http-errors";
import {Event} from "../domain/entities/event";
import {eventSchema} from "./schemas/event-schema";

const getEventsQuerySchema = z.object({
    selectionProcessId: z.string().min(1, 'Selection process ID is required'),
});

const deleteEventSchema = z.object({
    id: z.string().min(1, 'Event ID is required'),
});

interface ScheduleControllerContract {
    createEvent(req: Request, res: Response, next: NextFunction): Promise<void>
    getEvents(req: Request, res: Response, next: NextFunction): Promise<void>
    editEvent(req: Request, res: Response, next: NextFunction): Promise<void>
    deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void>
}

@controller('/schedule')
export class ScheduleController implements ScheduleControllerContract {
    constructor(
        @inject(CreateEventUseCase) private readonly createEventUseCase: CreateEventUseCaseContract,
        @inject(GetEventsUseCase) private readonly getEventsUseCase: GetEventsUseCaseContract,
        @inject(EditEventUseCase) private readonly editEventUseCase: EditEventUseCaseContract,
        @inject(DeleteEventUseCase) private readonly deleteEventUseCase: DeleteEventUseCaseContract,
    ) {
    }

    @httpPost('/events')
    public async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = eventSchema.parse(req.body);
            const newEvent = this.createEventUseCase.execute(new Event(
                '',
                validatedData.selectionProcessId,
                validatedData.name,
                validatedData.type,
                null,
                null,
                validatedData.durationDays
            ));
            res.status(201).json(newEvent);
        } catch (error: any) {
            this.handleError(error, next)
        }
    }

    @httpGet('/events')
    public async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { selectionProcessId } = getEventsQuerySchema.parse(req.query);
            const events = this.getEventsUseCase.execute(selectionProcessId);
            res.status(200).json(events);
        } catch (error: any) {
            this.handleError(error, next);
        }
    }

    @httpPut('/events/:id')
    public async editEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const validatedData = eventSchema.parse(req.body);
            const updatedEvent = this.editEventUseCase.execute(new Event(
                id,
                validatedData.selectionProcessId,
                validatedData.name,
                validatedData.type,
                null,
                null,
                validatedData.durationDays
            ));
            res.status(200).json(updatedEvent);
        } catch (error: any) {
            this.handleError(error, next);
        }
    }

    @httpDelete('/events/:id')
    public async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = deleteEventSchema.parse(req.params);
            this.deleteEventUseCase.execute(id);
            res.status(204).send();
        } catch (error: any) {
            this.handleError(error, next);
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
