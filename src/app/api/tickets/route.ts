import { NextResponse } from 'next/server';
import { getAllTickets, createTicket } from '@/database/tickets.model';
import { createTicketSchema } from '@/schema/ticketSchema';

export async function GET() {
  try {
    const tickets = getAllTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createTicketSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newTicket = createTicket({
      ...body,
      status: 'incomplete',
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}
