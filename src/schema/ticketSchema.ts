import { z } from 'zod';

export const createTicketSchema = z.object({
  fullname: z.string().min(1),
  telephone: z.string().min(5),
  brand: z.string().min(1),
  comment: z.string().min(1),
})
