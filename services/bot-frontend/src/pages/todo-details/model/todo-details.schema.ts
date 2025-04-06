import {z} from 'zod';
import {StatusType} from "./types.ts";

export const TodoDetailsSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    status: z.nativeEnum(StatusType).default(StatusType.IN_PROCESS),
});
