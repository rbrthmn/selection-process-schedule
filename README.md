# Selection Process Schedule - Study Project

This project serves as a comprehensive study case demonstrating the application of **design patterns**, **clean architecture**, and **abstraction**. The primary goal is to showcase a robust and maintainable codebase by separating concerns into distinct layers: Presentation (Controllers), Domain (Use Cases, Entities), and Infrastructure (Data Sources).

## Context: Public Selection Service Scheduling

The core problem this project addresses is managing the schedule for a public selection process. This involves creating, retrieving, and organizing various stages or "events" (like application deadlines, exams, and interviews) for a specific selection process, ensuring they follow a logical sequence.

## Architecture

The project follows **Clean Architecture** principles, dividing the application into concentric layers with the Dependency Rule: inner layers know nothing about outer layers.

*   **Domain Layer**: The heart of the application. It contains the business logic, entities, and interfaces (contracts). It is independent of frameworks and external agencies.
*   **Infrastructure Layer**: Implements the interfaces defined in the Domain layer. It handles external concerns like database access (currently simulated with a local file), file systems, or third-party services.
*   **Presentation Layer**: Responsible for handling HTTP requests and responses. It uses Controllers to invoke Use Cases from the Domain layer and return the results to the client.

## Design Patterns & Algorithms

This project deliberately employs several design patterns and algorithms to solve complex problems elegantly:

*   **Dependency Injection (DI)**: Using **InversifyJS**, the project achieves loose coupling between classes. Dependencies are injected rather than instantiated internally, making the system easier to test and maintain.
*   **Repository Pattern**: Access to data is abstracted behind interfaces (contracts). This allows the underlying data storage mechanism to change (e.g., from a JSON file to a SQL database) without affecting the business logic.
*   **Chain of Responsibility (Pipeline)**: Complex processing flows are managed using a Pipeline pattern. This allows for a sequence of processing steps (middleware-like) where each step can perform an action or validation before passing control to the next.
*   **Graph Algorithms**: The scheduling problem is modeled as a Directed Acyclic Graph (DAG). Events are nodes, and dependencies are edges. Algorithms (like topological sort or traversal) are used to calculate dates and validate the sequence of events, ensuring that prerequisites are met before dependent events can occur.

## Tech Stack

This project is built with a focus on modern TypeScript development and a clean, decoupled architecture.

*   **Core**:
    *   **TypeScript**: For type-safe and scalable code.
    *   **Node.js**: As the JavaScript runtime environment.
*   **API & Framework**:
    *   **Express.js**: A minimal and flexible Node.js web application framework.
    *   **InversifyJS**: A powerful and lightweight inversion of control (IoC) container for TypeScript, used here with `inversify-express-utils` to manage dependency injection and routing.
*   **Data & Validation**:
    *   **Local JSON File**: For data persistence, using a `mock-data.json` file. This is managed by the `LocalScheduleDatasourceImpl`.
    *   **Zod**: For schema declaration and validation, ensuring type-safe data handling from requests.
*   **Testing**:
    *   **Jest** & **ts-jest**: For unit and integration testing of the application layers.
*   **Development Tools**:
    *   **ts-node**: To execute TypeScript files directly without pre-compilation.
    *   **dotenv** & **env-var**: For managing environment variables.

## Configuration

The application uses environment variables for configuration. A `.env.example` file is provided as a template.

| Variable     | Description                                      | Default    |
| :----------- | :----------------------------------------------- | :--------- |
| `PORT`       | The port number the server will listen on.       | `3000`     |
| `API_PREFIX` | The prefix for all API routes (e.g., `/api/v1`). | `/api/v1` |

To configure the environment, create a `.env` file in the root directory and populate it with your values.

## How to Boot the Project

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rbrthmn/selection-process-schedule.git
    cd selection-process-schedule
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Data File:**
    The application uses a local `mock-data.json` file. On the first run, it will automatically be created by copying `mock-data-example.json`. You can modify this file to seed the application with different initial data.

4.  **Start the application in development mode:**
    ```bash
    npm run dev
    ```
    The application will start, and you should see the message `Server running on port [PORT]...` in your console. The API will be accessible at `http://localhost:3000` (or the port you define).

5.  **Run Tests:**
    ```bash
    npm test
    ```

## Main Endpoints

The API is versioned under the `/api/v1` prefix.

### Schedule Management

*   **`POST /api/v1/schedule/events`**
    *   **Description**: Creates a new event for a selection process.
    *   **Request Body**:
        ```json
        {
          "selectionProcessId": "string",
          "name": "string",
          "type": "string",
          "durationDays": number,
          "isActive": boolean,
          "dependencies": [number]
        }
        ```
    *   **Example Response**: `201 Created` with the newly created event object.

*   **`GET /api/v1/schedule/events`**
    *   **Description**: Retrieves all events for a given selection process.
    *   **Query Parameters**:
        *   `selectionProcessId` (required): The ID of the selection process.
    *   **Example Response**: `200 OK` with an array of event objects.
        ```json
        [
            {
                "id": "1",
                "selectionProcessId": "process-abc",
                "name": "Application Period",
                "type": "submission",
                "initialDate": null,
                "endDate": null,
                "durationDays": 10,
                "isActive": true
            }
        ]
        ```

*   **`PUT /api/v1/schedule/events/:id`**
    *   **Description**: Updates an existing event.
    *   **Path Parameters**:
        *   `id`: The ID of the event to update.
    *   **Query Parameters**:
        *   `selectionProcessId` (required): The ID of the selection process the event belongs to.
    *   **Request Body**: (Requires the full event object as per the creation schema)
        ```json
        {
          "selectionProcessId": "string",
          "name": "string",
          "type": "string",
          "durationDays": number,
          "isActive": boolean,
          "dependencies": [number]
        }
        ```
    *   **Example Response**: `200 OK` with the updated event object.

*   **`DELETE /api/v1/schedule/events/:id`**
    *   **Description**: Deletes an event.
    *   **Path Parameters**:
        *   `id`: The ID of the event to delete.
    *   **Example Response**: `204 No Content`.
