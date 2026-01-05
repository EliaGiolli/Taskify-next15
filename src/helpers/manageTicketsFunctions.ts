// utils/ticketStats.ts
import type { Ticket } from '@/types/ticket'

export function getTotalTickets(tickets: Ticket[]): number {
  return tickets.length
}

export function getCompletedTickets(tickets: Ticket[]): number {
  return tickets.filter(t => t.status === 'completed').length
}

export function getIncompleteTickets(tickets: Ticket[]): number {
  return tickets.filter(t => t.status === 'incomplete').length
}
