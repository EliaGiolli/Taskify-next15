import TicketList from '@/components/layouts/TicketList';

export default function TicketsPage() {

  return (
    <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
      <TicketList />
    </section>
  )
}