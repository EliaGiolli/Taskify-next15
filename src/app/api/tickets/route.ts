import { NextResponse } from 'next/server'
import { ticketsList } from '@/data/tickets'
import { Ticket } from '@/types/ticket'
import { createTicketSchema } from '@/schema/ticketSchema'


export async function GET() {
  return NextResponse.json(ticketsList, { status: 200 })
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = createTicketSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const newTicket: Ticket = {
    id: Date.now(),
    status: 'incomplete',
    ...parsed.data,
  }

  ticketsList.push(newTicket)

  return NextResponse.json(newTicket, { status: 201 })
}
