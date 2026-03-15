import {injectable} from 'inversify';
import {ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";
import * as fs from 'fs';
import * as path from 'path';

@injectable()
export class LocalScheduleDatasourceImpl implements ScheduleDatasourceContract {
    private data: { events: any[], dependencies: any[] } = {events: [], dependencies: []};
    private readonly mockFilePath = path.join(process.cwd(), 'mock-data.json');
    private readonly exampleFilePath = path.join(process.cwd(), 'mock-data-example.json');

    constructor() {
        this.initializeData();
    }

    private initializeData() {
        try {
            if (!fs.existsSync(this.mockFilePath)) {
                if (fs.existsSync(this.exampleFilePath)) {
                    fs.copyFileSync(this.exampleFilePath, this.mockFilePath);
                    console.log(`Created ${this.mockFilePath} from example.`);
                } else {
                    console.warn(`Example mock file not found at ${this.exampleFilePath}. Starting with empty data.`);
                    return;
                }
            }

            const fileContent = fs.readFileSync(this.mockFilePath, 'utf-8');
            this.data = JSON.parse(fileContent);

            if (!this.data.events) this.data.events = [];
            if (!this.data.dependencies) this.data.dependencies = [];
        } catch (error) {
            console.error("Error initializing local datasource:", error);
            this.data = {events: [], dependencies: []};
        }
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
            .filter((e: any) => e.selectionProcessId === selectionProcessId)
            .map((e: any) => new Event(
                e.id,
                e.selectionProcessId,
                e.name,
                e.type,
                e.initialDate,
                e.endDate,
                e.durationDays,
                e.isActive ?? true
            ));
    }

    updateEvent(event: Event): Event {
        const index = this.data.events.findIndex((e: any) => e.id === event.id);
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
        const index = this.data.events.findIndex((e: any) => e.id === id);
        if (index !== -1) {
            this.data.events.splice(index, 1);
            // TODO Also remove dependencies related to this event
            this.data.dependencies = this.data.dependencies.filter((d: any) => d.event !== id && d.previousEvent !== id);
        }
    }

    createDependency(dependency: Dependency): Dependency {
        return new Dependency(
            dependency.eventId,
            dependency.previousEventId,
            dependency.dislocationDays
        );
    }

    getDependencies(eventsIds: string[]): Dependency[] {
        return this.data.dependencies
            .map((d: any) => {
                return new Dependency(d.eventId, d.previousEventId, d.dislocationDays);
            })
            .filter((d: Dependency | null) => d !== null)
            .filter((d: Dependency) => eventsIds.includes(d.eventId) || eventsIds.includes(d.previousEventId)) as Dependency[];
    }
}
