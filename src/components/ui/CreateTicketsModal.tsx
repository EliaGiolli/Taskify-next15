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

        <form
          className="mt-4 flex flex-col gap-4"
          role="form"
          aria-label="Creazione nuovo ticket"
        >
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullname"
              className="text-sm text-slate-300"
            >
              Fullname
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Mario Rossi"
              className="
                bg-slate-900
                text-slate-200
                border border-slate-700
                rounded-md
                px-3 py-2
                placeholder:text-slate-500
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
              "
              required
            />
          </div>

          {/* Telephone */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="telephone"
              className="text-sm text-slate-300"
            >
             Telephone
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              placeholder="+39 333 1234567"
              className="bg-slate-900 text-slate-200 border border-slate-700 rounded-md px-3 py-2 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              required
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="brand"
              className="text-sm text-slate-300"
            >
              Car Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              placeholder="Lamborghini, Volkswagen, Ducati..."
              className="bg-slate-900 text-slate-200 border border-slate-700 rounded-md px-3 py-2 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            />
          </div>

          {/* Descrizione */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm text-slate-300"
            >
              Describe in detail the problem you're facing
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe in detail the problem you're facing"
              className="
                bg-slate-900
                text-slate-200
                border border-slate-700
                rounded-md
                px-3 py-2
                placeholder:text-slate-500
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
                resize-none
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-2
              bg-violet-600
              hover:bg-violet-500
              text-white
              font-medium
              py-2
              rounded-md
              transition
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-400
            "
          >
            Create ticket
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
