'use client'
import { useState } from 'react';

import ManageTicketLayout from "./ManageTicketLayout";
import CreateTicketModal from '../ui/CreateTicketsModal';
import Image from "next/image";
import { IoMdAdd } from "react-icons/io"; 
import { useFetchTickets } from '@/custom hooks/useFetchTickets';
import { getCompletedTickets, getIncompleteTickets, getTotalTickets } from '@/lib/manageTicketsFunctions';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tickets = [], isLoading } = useFetchTickets();

  // Calculate stats from fetched tickets
  const totalTickets = getTotalTickets(tickets);
  const completedTickets = getCompletedTickets(tickets);
  const incompletedTickets = getIncompleteTickets(tickets);

  return (
    <header
      role='banner' 
      className="bg-black w-full px-5 py-5 mb-10 flex flex-col rounded-md border-b-2 border-violet-400"
    >
      <div className="w-full py-5 flex justify-center items-center gap-x-3">
        <Image src="/logo.jpg" height={50} width={60} alt="Ticketify logo"/>
        <span className="text-3xl md:text-4xl text-violet-400 uppercase">Ticketify</span>
      </div>
      <nav className="w-full flex justify-center items-center gap-x-6 p-4" role='navigation'>
        <span className="text-sm md:text-2xl border-2 bg-blue-200 border-blue-600 text-black rounded-md p-2 cursor-pointer">
          Total: {isLoading ? '...' : totalTickets}
        </span>
        <span className="text-sm md:text-2xl border-2 bg-green-200 border-green-400 text-slate-800 rounded-md p-2 cursor-pointer">
          Completed: {isLoading ? '...' : completedTickets}
        </span>
        <span className="text-sm md:text-2xl border-2 bg-red-200 border-red-500 text-black rounded-md p-2 cursor-pointer">
          Uncompleted: {isLoading ? '...' : incompletedTickets}
        </span>
        <ManageTicketLayout 
          spanText="aggiungi ticket"
          onAction={() => setIsModalOpen(true)}
        >
          <IoMdAdd size={30} /> 
        </ManageTicketLayout>
        <CreateTicketModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </nav>
    </header>
  )
}

export default Header