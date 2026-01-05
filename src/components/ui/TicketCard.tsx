'use client'

import ManageTicketLayout from '../layouts/ManageTicketLayout';
import { MdDelete } from "react-icons/md";
import type { Ticket } from '@/types/ticket'

interface TicketCardProps {
  ticket: Ticket
}


function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className='border-2 border-violet-400 flex flex-col justify-center items-center text-center rounded-md p-3'>
        <div>
            <h2 className='text-violet-400 text-2xl p-2'>Ticket ID:{ticket.id}</h2>
        </div>
        <div className='px-2 mb-5'>
            <ul>
                <li className='p-1 text-violet-300'>Full name: 
                    <span className='text-slate-200 ml-2'>{ticket.fullname}</span>
                </li>
                <li className='p-1 text-violet-300'>Telephon number: 
                    <span className='text-slate-200 ml-2'>{ticket.telephone}</span>
                </li>
                <li className='p-1 text-violet-300'>Brand: 
                    <span className='text-slate-200 ml-2'>{ticket.brand}</span>
                </li>
                <li className='p-1 text-violet-300'>comment: 
                    <span className='text-slate-200 ml-2'>{ticket.comment}</span>
                </li>
            </ul>
        </div>
        <ManageTicketLayout spanText='cancella ticket'>
            <MdDelete size={30}/>
        </ManageTicketLayout>
    </article>
  )
}

export default TicketCard