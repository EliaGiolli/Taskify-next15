import db from './db'
import { Ticket } from '@/types/ticket'

export function getAllTickets(): Ticket[] {
  return db.prepare(`SELECT * FROM tickets`).all() as Ticket[]
}

export function getTicketById(id: number): Ticket | undefined {
  return db.prepare(`SELECT * FROM tickets WHERE id = ?`).get(id) as Ticket | undefined
}

export function createTicket(data: Omit<Ticket, 'id'>) {
  const stmt = db.prepare(`
    INSERT INTO tickets (fullname, telephone, brand, status, comment)
    VALUES (@fullname, @telephone, @brand, @status, @comment)
  `)

  const result = stmt.run(data)

  return {
    id: result.lastInsertRowid,
    ...data,
  }
}

export function deleteTicket(id: number) {
  return db.prepare(`DELETE FROM tickets WHERE id = ?`).run(id)
}
