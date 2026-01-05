'use client'

import TicketCard from "@/components/ui/TicketCard";
import rawTickets from '@/data/tickets.json'
import type { Ticket } from '@/types/ticket'

const tickets = rawTickets as Ticket[]

export default function Home() {
  return (
    <div className="bg-zinc-900 text-white w-full grid grid-cols-2 md:grid-cols-3 gap-6 p-8 rounded-md">
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
