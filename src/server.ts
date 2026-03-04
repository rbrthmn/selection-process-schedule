import express, {Router, Request, Response, NextFunction} from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import {HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY} from './core/constants';
import {AppError} from './core/errors/custom.error';
import {ErrorMiddleware} from './core/middlewares/error.middleware';

interface ServerOptions {
    port: number;
    routes: Router;
    apiPrefix: string;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly apiPrefix: string;

    constructor(options: ServerOptions) {
        const {port, routes, apiPrefix} = options;
        this.port = port;
        this.routes = routes;
        this.apiPrefix = apiPrefix;
    }

    async start(): Promise<void> {
        this.setMiddlewares();
        this.setRoutes();
        this.setErrorHandlers();

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}...`);
        });
    }

    private setMiddlewares(): void {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(compression());
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour',
            })
        );

        // CORS
        this.app.use((req, res, next) => {
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

    private setRoutes(): void {
        this.app.use(this.apiPrefix, this.routes);

        this.app.get('/', (_req: Request, res: Response) => {
            return res.status(HttpCode.OK).send({
                message: `Welcome to Process Selection API! \n Endpoints available at http://localhost:${this.port}/`,
            });
        });
    }

    private setErrorHandlers(): void {
        this.app.all('*', (req: Request, _: Response, next: NextFunction): void => {
            next(AppError.notFound(`Cant find ${req.originalUrl} on this server.`));
        });

        this.app.use(ErrorMiddleware.handleError);
    }
}
