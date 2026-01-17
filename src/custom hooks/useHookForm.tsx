import { useState } from 'react'
import { useCreateTicket } from '@/custom hooks/useCreateTicket'

interface UseCreateTicketFormOptions {
  onSuccess?: () => void
}

export function useCreateTicketForm(
  options?: UseCreateTicketFormOptions
) {
  const createTicket = useCreateTicket()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      fullname: formData.get('fullname') as string,
      telephone: formData.get('telephone') as string,
      brand: formData.get('brand') as string,
      comment: formData.get('comment') as string,
    }

    try {
      await createTicket.mutateAsync(data)
      e.currentTarget.reset()
      options?.onSuccess?.()
    } catch (error) {
      console.error('Error creating ticket:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
  }
}
