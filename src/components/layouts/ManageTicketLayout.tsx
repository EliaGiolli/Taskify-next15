'use client'

import Button from "../ui/Button"
import { TicketLayout } from "@/types/customTypes"

function ManageTicketLayout({ spanText, children, onAction }: TicketLayout) {
  return (
    <div className="flex ml-5 md:ml-8">
      <Button 
        variant="action"
        size="md"
        onClick={onAction}
      >
        {children}
        <span>{spanText}</span>
      </Button>
    </div>
  )
}

export default ManageTicketLayout