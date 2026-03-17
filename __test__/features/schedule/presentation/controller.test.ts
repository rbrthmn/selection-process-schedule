import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import {Request, Response, NextFunction} from 'express';
import {ScheduleController} from '../../../../src/features/schedule/presentation/controller';
import {CreateEventUseCaseContract} from '../../../../src/features/schedule/domain/usecases/create-event';
import {GetEventsUseCaseContract} from '../../../../src/features/schedule/domain/usecases/get-events';
import {EditEventUseCaseContract} from '../../../../src/features/schedule/domain/usecases/edit-event';
import {DeleteEventUseCaseContract} from '../../../../src/features/schedule/domain/usecases/delete-event';
import {Event} from '../../../../src/features/schedule/domain/entities/event';

describe('ScheduleController', () => {
    let createEventUseCase: jest.Mocked<CreateEventUseCaseContract>;
    let getEventsUseCase: jest.Mocked<GetEventsUseCaseContract>;
    let editEventUseCase: jest.Mocked<EditEventUseCaseContract>;
    let deleteEventUseCase: jest.Mocked<DeleteEventUseCaseContract>;
    let controller: ScheduleController;

    let req: Partial<Request>;
    let res: {
        status: jest.Mock;
        json: jest.Mock;
        send: jest.Mock;
    };
    let next: jest.Mock;

    beforeEach(() => {
        createEventUseCase = {execute: jest.fn()};
        getEventsUseCase = {execute: jest.fn()};
        editEventUseCase = {execute: jest.fn()};
        deleteEventUseCase = {execute: jest.fn()};

        controller = new ScheduleController(
            createEventUseCase,
            getEventsUseCase,
            editEventUseCase,
            deleteEventUseCase
        );

        req = {
            body: {},
            query: {},
            params: {},
        };
        res = {
            status: jest.fn(),
            json: jest.fn(),
            send: jest.fn(),
        };
        res.status.mockReturnThis();
        res.json.mockReturnThis();
        res.send.mockReturnThis();

        next = jest.fn();
    });

    describe('createEvent', () => {
        it('with valid data should return 201 and the created event', async () => {
            const eventData = {
                selectionProcessId: '1',
                name: 'Test Event',
                type: 'test',
                durationDays: 1,
                isActive: true,
                dependencies: [],
            };
            const expectedEvent = new Event('1', '1', 'Test Event', 'test', null, null, 1, true);
            req.body = eventData;
            createEventUseCase.execute.mockReturnValue(expectedEvent);

            await controller.createEvent(req as Request, res as unknown as Response, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expectedEvent);
        });

        it('with invalid data should call next with an error', async () => {
            req.body = {};

            await controller.createEvent(req as Request, res as unknown as Response, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getEvents', () => {
        it('with valid selectionProcessId should return 200 and the events', async () => {
            const selectionProcessId = '1';
            const expectedResponse = {success: true, events: []};
            req.query = {selectionProcessId};
            getEventsUseCase.execute.mockReturnValue(expectedResponse);

            await controller.getEvents(req as Request, res as unknown as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });
    });

    describe('editEvent', () => {
        it('with valid data should return 200 and the updated event', async () => {
            const eventId = '1';
            const selectionProcessId = '1';
            const eventData = {
                selectionProcessId: '1',
                name: 'Updated Test Event',
                type: 'updatedTest',
                durationDays: 2,
                isActive: false,
                dependencies: [],
            };
            const expectedEvent = new Event(
                eventId,
                selectionProcessId,
                eventData.name,
                eventData.type,
                null,
                null,
                eventData.durationDays,
                eventData.isActive
            );
            req.params = {id: eventId};
            req.query = {selectionProcessId};
            req.body = eventData;
            editEventUseCase.execute.mockReturnValue(expectedEvent);

            await controller.editEvent(req as Request, res as unknown as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('deleteEvent', () => {
        it('with a valid id should return 204', async () => {
            const eventId = '1';
            req.params = {id: eventId};
            deleteEventUseCase.execute.mockReturnValue(undefined);

            await controller.deleteEvent(req as Request, res as unknown as Response, next);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
