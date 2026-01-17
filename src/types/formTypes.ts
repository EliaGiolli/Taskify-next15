import { z } from 'zod'
import { createTicketSchema } from '@/schema/ticketSchema'

export type CreateTicketInput = z.infer<typeof createTicketSchema>
