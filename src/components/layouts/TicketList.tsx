'use client'

import TicketCard from '@/components/ui/TicketCard'
import { useFetchTickets } from '@/custom hooks/useFetchTickets';
import { useDeleteTicket } from '@/custom hooks/useDeleteTicket';
import type { Ticket } from '@/types/ticket';
import TicketsLoading from '@/app/tickets/loading';


function TicketList() {
  const { data, isLoading, error } = useFetchTickets();
  const deleteTicket = useDeleteTicket()

  if (isLoading) return <TicketsLoading />
  
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
    <>
        {data.map((ticket:Ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={() => deleteTicket.mutate(ticket.id)}
            />
        ))}
    </>
  )
}

export default TicketList