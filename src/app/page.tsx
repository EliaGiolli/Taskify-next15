'use client'

import TicketCard from '@/components/ui/TicketCard'
import { useFetchTickets } from '@/custom hooks/useFetchTickets';
import { useDeleteTicket } from '@/custom hooks/useDeleteTicket';

export default function TicketsList() {
  const { data, isLoading, error } = useFetchTickets();
  const deleteTicket = useDeleteTicket()

  if (isLoading) return <p className="text-slate-200">Loading...</p>
  
  if (error) {
    return (
      <p className="text-red-400">
        Error loading tickets: {error.message}
      </p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-slate-400 text-center">
        No tickets found. Create your first ticket!
      </p>
    )
  }

  return (
    <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
      {data.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDelete={() => deleteTicket.mutate(ticket.id)}
        />
      ))}
    </section>
  )
}