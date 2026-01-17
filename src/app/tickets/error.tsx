'use client'
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function TicketsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-red-400">
        Error loading tickets: {error.message}
      </p>
      <Button
        onClick={reset}
        variant="danger"
      >
        Try again
      </Button>
    </div>
  )
}
