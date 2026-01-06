'use client'

import { useState } from 'react'
import rawTickets from '@/data/tickets.json'
import TicketCard from '@/components/ui/TicketCard'
import type { Ticket } from '@/types/ticket'

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>(
    rawTickets as Ticket[]
  )

  const deleteTicket = (id: number) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id))
  }

  return (
    <section className="grid md:grid-cols-2 gap-y-5 gap-x-6">
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDelete={deleteTicket}
        />
      ))}
    </section>
  )
}
