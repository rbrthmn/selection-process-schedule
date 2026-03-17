import {z} from "zod"

export const getEventsQuerySchema = z.object({
    selectionProcessId: z.string().min(1, 'Selection process ID is required'),
});