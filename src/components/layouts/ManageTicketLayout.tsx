'use client'

import Button from "../ui/Button"
import { TicketLayout } from "@/types/customTypes"

function ManageTicketLayout({ spanText, children, onAction }: TicketLayout) {

  return (
    <>
        <div className="flex ml-8">
            <Button 
                classname="bg-violet-500 hover:bg-violet-600 text-white rounded-md flex ustify-center items-center text-center gap-2 p-2 cursor-pointer"
                onClick={onAction}
                >
              {children}
              <span>{spanText}</span>
            </Button>
          </div>
    </>
  )
}

export default ManageTicketLayout