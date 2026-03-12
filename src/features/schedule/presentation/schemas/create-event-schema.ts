import {z} from 'zod';

export const createEventSchema = z.object({
    name: z.string().min(1, 'Event name is required'),
    type: z.string().min(1, 'Event type is required'),
    selectionProcessId: z.string().min(1, 'Selection process ID is required'),
    durationDays: z.number().int().positive(),
});
