import { Ticket } from '@/types/ticket'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api'

// GET
export async function getTickets(): Promise<Ticket[]> {
  const res = await fetch(`${BASE_URL}/tickets`)
  if (!res.ok) throw new Error('Errore fetch tickets')
  return res.json()
}

// POST
export async function createTicket(data: {
  fullname: string
  telephone: string
  brand: string
  comment: string
}) {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Errore creazione ticket')
  return res.json()
}

// DELETE
export async function deleteTicket(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/tickets/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Errore eliminazione ticket')
  }
}
