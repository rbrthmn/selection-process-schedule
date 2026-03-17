import 'reflect-metadata';
import {envs} from './core/config/env';
import {Server} from './server';
import {container} from './di/inversify-config';

(() => {
    main();
})();

/**
 * @function main
 * @description The entry point of the application. It initializes the server and starts it.
 */
function main(): void {
    const server = new Server({
        port: envs.PORT,
        container: container,
        apiPrefix: envs.API_PREFIX,
    });
    void server.start();
}
