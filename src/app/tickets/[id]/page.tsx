import { notFound } from 'next/navigation'
import { getTicket } from '@/lib/api/handleTickets'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TicketDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params
  const ticketId = Number(id)

  if (isNaN(ticketId)) {
    notFound()
  }

  let ticket
  try {
    ticket = await getTicket(ticketId)
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/tickets"
        className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to tickets
      </Link>

      <article className="bg-black border-2 border-violet-400 flex flex-col justify-center items-center text-center rounded-md px-6 py-8">
        <h1 className="text-violet-400 text-3xl font-bold mb-6">
          Ticket ID: {ticket.id}
        </h1>

        <div className="w-full space-y-4 text-left">
          <div className="border-b border-violet-400/30 pb-3">
            <p className="text-violet-300 font-semibold">Full Name:</p>
            <p className="text-slate-200 mt-1">{ticket.fullname}</p>
          </div>

          <div className="border-b border-violet-400/30 pb-3">
            <p className="text-violet-300 font-semibold">Telephone:</p>
            <p className="text-slate-200 mt-1">{ticket.telephone}</p>
          </div>

          <div className="border-b border-violet-400/30 pb-3">
            <p className="text-violet-300 font-semibold">Brand:</p>
            <p className="text-slate-200 mt-1">{ticket.brand}</p>
          </div>

          <div className="border-b border-violet-400/30 pb-3">
            <p className="text-violet-300 font-semibold">Status:</p>
            <p className={`mt-1 font-semibold ${
              ticket.status === 'completed' 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {ticket.status}
            </p>
          </div>

          <div>
            <p className="text-violet-300 font-semibold">Comment:</p>
            <p className="text-slate-200 mt-1 whitespace-pre-wrap">{ticket.comment}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
