import { NextResponse } from 'next/server'
import { createTicketSchema } from '@/schema/ticketSchema'
import { getAllTickets, createTicket } from '@/database/tickets.model'


export async function GET() {
  return NextResponse.json(getAllTickets(), { status: 200 })
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

  const newTicket = createTicket({
     ...body,
      status: 'incomplete',
  })


  return NextResponse.json(newTicket, { status: 201 })
}
