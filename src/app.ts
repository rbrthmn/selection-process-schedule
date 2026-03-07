import 'reflect-metadata';
import {envs} from './core/config/env';
import {Server} from './server';
import {container} from './di/inversify-config';

(() => {
    main();
})();

function main(): void {
    const server = new Server({
        port: envs.PORT,
        container: container,
        apiPrefix: envs.API_PREFIX,
    });
    void server.start();
}
