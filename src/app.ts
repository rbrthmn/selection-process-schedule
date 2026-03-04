import {envs} from './core/config/env';
import {AppRoutes} from './routes';
import {Server} from './server';

(() => {
    main();
})();

function main(): void {
    const server = new Server({
        routes: AppRoutes.routes,
        apiPrefix: envs.API_PREFIX,
        port: envs.PORT,
    });
    void server.start();
}
