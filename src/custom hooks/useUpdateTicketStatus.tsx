import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicketStatus } from '@/lib/api/handleTickets';

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'completed' | 'incomplete' }) =>
      updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    },
  })
}
