import {injectable} from 'inversify';
import {ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";
import {BaseLocalDatasource} from "../../../core/infrastructure/base-local-datasource";

interface ScheduleData {
    events: Event[];
    dependencies: Dependency[];
}

@injectable()
export class LocalScheduleDatasourceImpl extends BaseLocalDatasource<ScheduleData> implements ScheduleDatasourceContract {
    constructor() {
        super('mock-data.json', 'mock-data-example.json', {events: [], dependencies: []});
    }

    protected mapData(parsedData: any): ScheduleData {
        const events = (parsedData.events || []).map((e: any) => new Event(
            e.id,
            e.selectionProcessId,
            e.name,
            e.type,
            e.initialDate,
            e.endDate,
            e.durationDays,
            e.isActive ?? true
        ));
        const dependencies = (parsedData.dependencies || []).map((d: any) => new Dependency(d.eventId, d.previousEventId, d.dislocationDays));
        return {events, dependencies};
    }

    deleteDependencies(eventId: string): void {
        this.data.dependencies = this.data.dependencies.filter((d: Dependency) => d.eventId !== eventId);
        this.data.dependencies = this.data.dependencies.filter((d: Dependency) => d.previousEventId !== eventId);
    }

    createEvent(event: Event): Event {
        const newEvent = new Event(
            (this.data.events.length + 1).toString(),
            event.selectionProcessId,
            event.name,
            event.type,
            event.initialDate,
            event.endDate,
            event.durationDays,
            event.isActive
        );
        this.data.events.push(newEvent);
        return newEvent;
    }

    getEvents(selectionProcessId: string): Event[] {
        return this.data.events
            .filter((e: Event) => e.selectionProcessId === selectionProcessId);
    }

    updateEvent(event: Event): Event {
        const index = this.data.events.findIndex((e: Event) => e.id === event.id);
        if (index === -1) {
            throw new Error(`Event with id ${event.id} not found`);
        }

        this.data.events[index] = {
            ...this.data.events[index],
            name: event.name,
            type: event.type,
            initialDate: event.initialDate,
            endDate: event.endDate,
            durationDays: event.durationDays,
            selectionProcessId: event.selectionProcessId,
            isActive: event.isActive
        };
        return event;
    }

    deleteEvent(id: string): void {
        const index = this.data.events.findIndex((e: Event) => e.id === id);
        if (index !== -1) {
            this.data.events.splice(index, 1);
            this.deleteDependencies(id);
        }
    }

    createDependency(dependency: Dependency): Dependency {
        // Assuming dependencies are added to this.data.dependencies
        const newDependency = new Dependency(
            dependency.eventId,
            dependency.previousEventId,
            dependency.dislocationDays
        );
        this.data.dependencies.push(newDependency);
        return newDependency;
    }

    getDependencies(eventsIds: string[]): Dependency[] {
        return this.data.dependencies
            .filter((d: Dependency) => eventsIds.includes(d.eventId) || eventsIds.includes(d.previousEventId));
    }
}
