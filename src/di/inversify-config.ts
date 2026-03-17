import { Container } from 'inversify';
import { scheduleModule } from '../features/schedule/di/schedule-container';
import {Pipeline} from "../core/services/pipeline";

const container = new Container();

container.load(scheduleModule);
container.bind(Pipeline).to(Pipeline)

export { container };
