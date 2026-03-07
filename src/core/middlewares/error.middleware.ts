import {Response, NextFunction, Request} from 'express';
import {HttpCode} from '../constants';
import {isHttpError} from 'http-errors';

export class ErrorMiddleware {
    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (isHttpError(error)) {
            const {message, name, stack, validationErrors} = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({name, message, validationErrors, stack});
        } else {
            const name = 'InternalServerError';
            const message = 'An internal server error occurred';
            const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({name, message});
        }
        next();
    };
}
