import { useQuery } from '@tanstack/react-query';
import { getTickets } from '@/lib/api/handleTickets';

export function useFetchTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  })
}
