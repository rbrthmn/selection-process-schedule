import {z} from "zod"

export const deleteEventSchema = z.object({
    id: z.string().min(1, 'Event ID is required'),
});
