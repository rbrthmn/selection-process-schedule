import http from 'http';
import { ScheduleService } from './services/ScheduleService';
import { ScheduleController } from './http/controllers/ScheduleController';

const scheduleService = new ScheduleService();
const scheduleController = new ScheduleController(scheduleService);

const server = http.createServer((req, res) => {
  scheduleController.handleRequest(req, res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
