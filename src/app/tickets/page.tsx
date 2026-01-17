import { Suspense } from 'react'
import TicketList from '@/components/layouts/TicketList'
import TicketsLoading from './loading'
import TicketsHeader from '@/components/layouts/TicketsHeader'

export default function TicketsPage() {
  return (
    <>
      <TicketsHeader />
      <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
        <Suspense fallback={<TicketsLoading />}>
          <TicketList />
        </Suspense>
      </section>
    </>
  )
}
