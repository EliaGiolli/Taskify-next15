'use client'

import ManageTicketLayout from '../layouts/ManageTicketLayout';
import { MdDelete } from "react-icons/md";
import { Tickets } from 'lucide-react';
import type { Ticket } from '@/types/ticket'
import { motion } from 'motion/react';

interface TicketCardProps {
  ticket: Ticket,
  onDelete: (id:number) => void
}


function TicketCard({ ticket, onDelete }: TicketCardProps) {

  return (
    <motion.article 
        aria-labelledby='card-title'
        role='region'
        whileHover={{
            rotate: 3,
            scale: 1.03,
        }}
        transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }}
        className='bg-black border-2 border-violet-400 flex flex-col justify-center items-center text-center rounded-md px-3 py-8'
    >
        <div className='flex items-center'>
            <Tickets size={32} className='text-violet-300' aria-hidden="true" />
            <h2 
                id="card-title"
                className='text-violet-400 text-2xl p-2'>
                    Ticket ID:{ticket.id}
            </h2>
        </div>
        <div className='px-2 mb-5'>
            <ul>
                <li className='p-1 text-violet-300'>Full name: 
                    <span className='text-slate-200 ml-2'>{ticket.fullname}</span>
                </li>
                <li className='p-1 text-violet-300'>Telephone number: 
                    <span className='text-slate-200 ml-2'>{ticket.telephone}</span>
                </li>
                <li className='p-1 text-violet-300'>Brand: 
                    <span className='text-slate-200 ml-2'>{ticket.brand}</span>
                </li>
                <li className='p-1 flex flex-col text-violet-300'>Comment: 
                    <span className='text-slate-200 ml-2 px-2'>{ticket.comment}</span>
                </li>
            </ul>
        </div>
        <ManageTicketLayout 
            spanText='cancella ticket'
            onAction={() => onDelete(ticket.id)}    
        >
            <MdDelete size={30}/>
        </ManageTicketLayout>
    </motion.article>
  )
}

export default TicketCard