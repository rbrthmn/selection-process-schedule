import { Container } from 'inversify';
import { scheduleModule } from '../features/schedule/di/schedule.container';

const container = new Container();

container.load(scheduleModule);

export { container };
