import { NextResponse } from 'next/server'
import { ticketsList } from '@/data/tickets'

interface Params {
  params: { id: string }
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id)
  const index = await ticketsList.findIndex(t => t.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  ticketsList.splice(index, 1)

  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: Params) {
  const id = Number(params.id)
  const body = await req.json()

  const ticket = ticketsList.find(t => t.id === id)

  if (!ticket) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  ticket.status = body.status ?? ticket.status

  return NextResponse.json(ticket)
}
