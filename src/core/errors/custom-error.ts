import createError from 'http-errors';
import {HttpCode} from '../constants';

export interface ValidationType {
    fields: string[];
    constraint: string;
}

export class AppError {
    static badRequest(message: string, validationErrors?: ValidationType[]) {
        return createError(HttpCode.BAD_REQUEST, message, { name: 'BadRequestError', validationErrors });
    }

    static unauthorized(message: string) {
        return createError(HttpCode.UNAUTHORIZED, message, { name: 'UnauthorizedError' });
    }

    static forbidden(message: string) {
        return createError(HttpCode.FORBIDDEN, message, { name: 'ForbiddenError' });
    }

    static notFound(message: string) {
        return createError(HttpCode.NOT_FOUND, message, { name: 'NotFoundError' });
    }

    static internalServer(message: string) {
        return createError(HttpCode.INTERNAL_SERVER_ERROR, message, { name: 'InternalServerError' });
    }
}
