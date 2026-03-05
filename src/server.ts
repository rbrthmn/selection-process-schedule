import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import {Container} from 'inversify';
import express, {Request, Response, NextFunction} from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import {HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY} from './core/constants';
import {ErrorMiddleware} from './core/middlewares/error.middleware';
import {AppError} from "./core/errors/custom.error";

interface ServerOptions {
    port: number;
    container: Container;
    apiPrefix: string;
}

export class Server {
    private readonly port: number;
    private readonly container: Container;
    private readonly apiPrefix: string;

    constructor(options: ServerOptions) {
        const {port, container, apiPrefix} = options;
        this.port = port;
        this.container = container;
        this.apiPrefix = apiPrefix;
    }

    async start(): Promise<void> {
        const server = new InversifyExpressServer(this.container, null, {rootPath: this.apiPrefix});

        server.setConfig(this.configureMiddlewares.bind(this));
        server.setErrorConfig(this.configureErrorHandling.bind(this));

        const app = server.build();

        app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}...`);
        });
    }

    private configureMiddlewares(app: express.Application): void {
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(compression());
        app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour',
            })
        );

        // CORS
        app.use((req, res, next) => {
            const allowedOrigins = ['http://localhost:3000'];
            const origin = req.headers.origin;
            if (allowedOrigins.includes(origin!)) {
                res.setHeader('Access-Control-Allow-Origin', origin!);
            }
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }

    private configureErrorHandling(app: express.Application): void {
        app.all('*', (req: Request, _: Response, next: NextFunction): void => {
            next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
        });

        app.use(ErrorMiddleware.handleError);
    }
}
