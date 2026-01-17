'use client'

import Button from './Button';
import { MdDelete } from "react-icons/md";
import { Tickets, Check } from 'lucide-react';
import type { Ticket } from '@/types/ticket'
import { motion } from 'motion/react';
import { useDeleteTicket } from '@/custom hooks/useDeleteTicket';
import { useUpdateTicketStatus } from '@/custom hooks/useUpdateTicketStatus';

interface TicketCardProps {
  ticket: Ticket
}

function TicketCard({ ticket }: TicketCardProps) {
  const deleteTicket = useDeleteTicket()
  const updateStatus = useUpdateTicketStatus()

  const handleDelete = () => {
    deleteTicket.mutate(ticket.id)
  }

  const handleComplete = () => {
    updateStatus.mutate({ id: ticket.id, status: 'completed' })
  }

  const isCompleted = ticket.status === 'completed'

  return (
    <motion.article 
      aria-labelledby={`ticket-title-${ticket.id}`}
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
          id={`ticket-title-${ticket.id}`}
          className='text-violet-400 text-2xl p-2'>
          Ticket ID: {ticket.id}
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
      <section className='flex gap-x-5'>
        <Button 
          variant="danger"
          size="md"
          onClick={handleDelete}
          aria-label={`Delete ticket ${ticket.id}`}
        >
          <MdDelete size={20} />
          <span>cancella ticket</span>
        </Button>
        {!isCompleted && (
          <Button 
            variant="outline"
            size="md"
            onClick={handleComplete}
            aria-label={`Mark ticket ${ticket.id} as completed`}
          >
            <Check size={20} />
            <span>Mark as completed</span>
          </Button>
        )}
      </section>
    </motion.article>
  )
}

export default TicketCard