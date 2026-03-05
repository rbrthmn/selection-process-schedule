import {Response, NextFunction, Request} from 'express';
import {HttpCode} from '../constants';
import {AppError} from "../errors/custom.error";

export class ErrorMiddleware {
    public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
        if (error instanceof AppError) {
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
