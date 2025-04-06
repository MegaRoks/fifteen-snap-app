import {z} from 'zod';

export const TodoCreateSchema = z.array(z.object({
        title: z.string(),
    }),
);