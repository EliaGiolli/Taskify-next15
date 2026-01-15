import { deleteTicket } from '@/database/tickets.model'

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  deleteTicket(Number(id))

  return new Response(null, { status: 204 })
}
