'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface CreateTicketModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateTicketModal({
  open,
  onOpenChange,
}: CreateTicketModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuovo ticket</DialogTitle>
          <DialogDescription>
            Compila i dati per creare un nuovo ticket
          </DialogDescription>
        </DialogHeader>

        {/* qui dentro il form */}
        <form className="flex flex-col gap-4">
          <input placeholder="Nome completo" />
          <input placeholder="Telefono" />
          <input placeholder="Brand" />
          <textarea placeholder="Descrizione problema" />

          <button type="submit">Crea ticket</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
