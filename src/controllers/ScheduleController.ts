import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import { IScheduleService } from '../services/IScheduleService';

const createEventSchema = z.object({
  name: z.string().min(1),
  duration: z.number().positive(),
});

export class ScheduleController {
  constructor(private scheduleService: IScheduleService) {}

  async handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    // Basic CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (method === 'POST' && url === '/events') {
      await this.createEvent(req, res);
    } else if (method === 'GET' && url === '/events') {
      this.getEvents(res);
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
}
