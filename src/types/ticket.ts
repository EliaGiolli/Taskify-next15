// types/ticket.ts (consigliato)
export interface Ticket {
  id: number
  fullname: string
  telephone: string
  brand: string
  status: 'completed' | 'incomplete'
  comment: string
}
