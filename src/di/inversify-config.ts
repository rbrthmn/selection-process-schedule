import {Container, ContainerModule} from 'inversify';
import {scheduleModule} from '../features/schedule/di/schedule-container';
import {Pipeline} from "../core/services/pipeline";
import {generalInformationsModule} from "../features/general-informations/di/general-informations-container";

const container = new Container();

container.load(generalInformationsModule);
container.load(scheduleModule);
container.bind(Pipeline).to(Pipeline)

export {container};
