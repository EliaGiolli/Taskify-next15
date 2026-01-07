'use client'

import { useState } from 'react'
import { ticketsList } from '@/data/tickets';
import TicketCard from '@/components/ui/TicketCard'
import type { Ticket } from '@/types/ticket'

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsList);

  const deleteTicket = (id: number) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id))
  }

  return (
    <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
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
