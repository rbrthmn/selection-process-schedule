import {injectable} from 'inversify';
import {ScheduleDatasourceContract} from '../domain/datasources/schedule-datasource-contract';
import {Event} from "../domain/entities/event";
import {Dependency} from "../domain/entities/dependency";
import * as fs from 'fs';
import * as path from 'path';

@injectable()
export class LocalScheduleDatasourceImpl implements ScheduleDatasourceContract {
    private data: { events: any[], dependencies: any[] } = { events: [], dependencies: [] };
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
            this.data = { events: [], dependencies: [] };
        }
    }

    createEvent(event: Event): Event {
        const newEvent = new Event(
            (this.data.events.length + 1).toString(),
            event.name,
            event.type,
            event.initialDate,
            event.endDate,
            [],
            event.durationDays
        );
        this.data.events.push(newEvent);
        return newEvent;
    }

    getEvents(): Event[] {
        return this.data.events.map((e: any) => new Event(
            e.id,
            e.name,
            e.type,
            e.initialDate,
            e.endDate,
            e.dependencies || [],
            e.durationDays
        ));
    }

    createDependency(dependency: Dependency): Dependency {
        const newEvent = new Event(
            (this.data.events.length + 1).toString(),
            '',
            '',
            '',
            '',
            [],
           0
        );
        return new Dependency("", newEvent, newEvent, 0);
    }

    getDependencies(): Dependency[] {
        return this.data.dependencies.map((d: any) => {
            const eventData = this.data.events.find((e: any) => e.id === d.event);
            const previousEventData = this.data.events.find((e: any) => e.id === d.previousEvent);
            
            if (!eventData || !previousEventData) {
                return null;
            }

            const event = new Event(
                eventData.id, eventData.name, eventData.type, eventData.initialDate, 
                eventData.endDate, eventData.dependencies || [], eventData.durationDays
            );
            
            const previousEvent = new Event(
                previousEventData.id, previousEventData.name, previousEventData.type, previousEventData.initialDate, 
                previousEventData.endDate, previousEventData.dependencies || [], previousEventData.durationDays
            );

            return new Dependency(d.id, event, previousEvent, d.dislocationDays);
        }).filter((d: Dependency | null) => d !== null) as Dependency[];
    }
}
