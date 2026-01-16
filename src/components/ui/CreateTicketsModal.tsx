import ModalCardForm from './ModalCardForm';
import type { CreateTicketModalProps } from '@/types/modalTypes';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function CreateTicketModal({
  open,
  onOpenChange,
}: CreateTicketModalProps) {
 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-black
          text-slate-200
          border border-slate-800
          max-w-md
          mb-5
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-100">
            New ticket
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the details to open a new ticket with us!
          </DialogDescription>
        </DialogHeader>

        <ModalCardForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}