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
import {getEventsQuerySchema} from "./schemas/get-events-schema";
import {deleteEventSchema} from "./schemas/delet-event-schema";


interface ScheduleControllerContract {
    createEvent(req: Request, res: Response, next: NextFunction): Promise<void>
    getEvents(req: Request, res: Response, next: NextFunction): Promise<void>
    editEvent(req: Request, res: Response, next: NextFunction): Promise<void>
    deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void>
}

/**
 * @controller ScheduleController
 * @description Controller for handling schedule-related requests.
 */
@controller('/schedule')
export class ScheduleController implements ScheduleControllerContract {
    constructor(
        @inject(CreateEventUseCase) private readonly createEventUseCase: CreateEventUseCaseContract,
        @inject(GetEventsUseCase) private readonly getEventsUseCase: GetEventsUseCaseContract,
        @inject(EditEventUseCase) private readonly editEventUseCase: EditEventUseCaseContract,
        @inject(DeleteEventUseCase) private readonly deleteEventUseCase: DeleteEventUseCaseContract,
    ) {
    }

    /**
     * @endpoint POST /schedule/events
     * @param {Request} req - The express request object.
     * @param {Response} res - The express response object.
     * @param {NextFunction} next - The express next function.
     * @description Creates a new event.
     */
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
                validatedData.durationDays,
                validatedData.isActive
            ));
            res.status(201).json(newEvent);
        } catch (error: any) {
            this.handleError(error, next)
        }
    }

    /**
     * @endpoint GET /schedule/events
     * @param {Request} req - The express request object.
     * @param {Response} res - The express response object.
     * @param {NextFunction} next - The express next function.
     * @description Retrieves all events for a given selection process.
     */
    @httpGet('/events')
    public async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { selectionProcessId } = getEventsQuerySchema.parse(req.query);
            const response = this.getEventsUseCase.execute(selectionProcessId);
            res.status(200).json(response);
        } catch (error: any) {
            this.handleError(error, next);
        }
    }

    /**
     * @endpoint PUT /schedule/events/:id
     * @param {Request} req - The express request object.
     * @param {Response} res - The express response object.
     * @param {NextFunction} next - The express next function.
     * @description Edits an existing event.
     */
    @httpPut('/events/:id')
    public async editEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { selectionProcessId } = getEventsQuerySchema.parse(req.query);
            const { eventId } = req.params;
            const validatedData = eventSchema.parse(req.body);
            const updatedEvent = this.editEventUseCase.execute(
                selectionProcessId,
                eventId,
                validatedData
            );
            res.status(200).json(updatedEvent);
        } catch (error: any) {
            this.handleError(error, next);
        }
    }

    /**
     * @endpoint DELETE /schedule/events/:id
     * @param {Request} req - The express request object.
     * @param {Response} res - The express response object.
     * @param {NextFunction} next - The express next function.
     * @description Deletes an event.
     */
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

    /**
     * @method handleError
     * @param {any} error - The error object.
     * @param {e.NextFunction} next - The express next function.
     * @description Handles errors for the controller methods.
     * @private
     */
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
