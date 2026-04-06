import * as fs from 'fs';
import * as path from 'path';

/**
 * @abstract BaseLocalDatasource
 * @description Base class for local file-based datasources, handling common file operations.
 */
export abstract class BaseLocalDatasource<T> {
    protected data: T;
    private readonly mockFilePath: string;
    private readonly exampleFilePath: string;

    protected constructor(mockFileName: string, exampleFileName: string, initialData: T) {
        this.mockFilePath = path.join(process.cwd(), mockFileName);
        this.exampleFilePath = path.join(process.cwd(), exampleFileName);
        this.data = initialData;
        this.initializeData();
    }

    /**
     * @method initializeData
     * @description Common logic for loading data from a local JSON file.
     */
    private initializeData(): void {
        try {
            if (!fs.existsSync(this.mockFilePath)) {
                if (fs.existsSync(this.exampleFilePath)) {
                    fs.copyFileSync(this.exampleFilePath, this.mockFilePath);
                    console.log(`Created ${this.mockFilePath} from example.`);
                } else {
                    console.warn(`Example mock file not found at ${this.exampleFilePath}. Starting with initial data.`);
                    return;
                }
            }

            const fileContent = fs.readFileSync(this.mockFilePath, 'utf-8');
            const parsed = JSON.parse(fileContent);
            this.data = this.mapData(parsed);
        } catch (error) {
            console.error(`Error initializing local datasource at ${this.mockFilePath}:`, error);
        }
    }

    /**
     * @method mapData
     * @param {any} parsedData - The raw data parsed from JSON.
     * @returns {T} The data mapped to the required type T.
     * @description Subclasses must implement this to define how the JSON data is mapped to their internal data structure.
     */
    protected abstract mapData(parsedData: any): T;
}
