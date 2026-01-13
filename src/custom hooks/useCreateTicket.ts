import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '@/lib/api/handleTickets';

export function useCreateTicket() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tickets'] })
    },
  })
}
