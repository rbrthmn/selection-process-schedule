import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import { ScheduleService } from '../../services/ScheduleService';

const createEventSchema = z.object({
  name: z.string().min(1),
  duration: z.number().positive(),
});

const createDependencySchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
});

export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (method === 'GET' && url === '/events') {
      this.getEvents(res);
    } else if (method === 'POST' && url === '/events') {
      await this.createEvent(req, res);
    } else if (method === 'GET' && url === '/dependencies') {
      this.getDependencies(res);
    } else if (method === 'POST' && url === '/dependencies') {
      await this.createDependency(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  }

  private getEvents(res: ServerResponse) {
    const events = this.scheduleService.getEvents();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(events));
  }

  private async createEvent(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const validatedData = createEventSchema.parse(data);
        const newEvent = this.scheduleService.createEvent(validatedData.name, validatedData.duration);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newEvent));
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Validation Error', errors: error.errors }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error.message }));
        }
      }
    });
  }

  private getDependencies(res: ServerResponse) {
    const dependencies = this.scheduleService.getDependencies();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dependencies));
  }

  private async createDependency(req: IncomingMessage, res: ServerResponse) {
    // Implementation for creating dependency
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Implemented' }));
  }
}
