'use client'

import TicketCard from '@/components/ui/TicketCard'
//Tanstack Query custom hooks
import { useFetchTickets } from '@/custom hooks/useFetchTickets';
import { useDeleteTicket } from '@/custom hooks/useDeleteTicket';

export default function TicketsList() {
  //const [tickets, setTickets] = useState<Ticket[]>(ticketsList);

  const { data, isLoading } = useFetchTickets();
  const deleteTicket = useDeleteTicket()

   if (isLoading) return <p>Loading...</p>

  return (
    <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
      {data?.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onDelete={() => deleteTicket.mutate(ticket.id)}
        />
      ))}
    </section>
  )
}
