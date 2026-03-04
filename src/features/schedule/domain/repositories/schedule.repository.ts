import {EventEntity} from '../entities/event.entity';
import {DependencyEntity} from '../entities/dependency.entity';

export abstract class ScheduleRepository {
    abstract createEvent(event: EventEntity): EventEntity;

    abstract getEvents(): EventEntity[];

    abstract createDependency(dependency: DependencyEntity): DependencyEntity;

    abstract getDependencies(): DependencyEntity[];

    // Add other abstract methods for schedule-related operations as needed
}
