import { NextResponse } from 'next/server'
import { ticketsList } from '@/data/tickets'
import { Ticket } from '@/types/ticket'

export async function GET() {
  return NextResponse.json(ticketsList);
}

export async function POST(req: Request) {
  const body = await req.json()

  const newTicket: Ticket = {
    id: Date.now(),
    fullname: body.fullname,
    telephone: body.telephone,
    brand: body.brand,
    status: 'incomplete',
    comment: body.comment,
  }

  ticketsList.push(newTicket)

  return NextResponse.json(newTicket, { status: 201 })
}
