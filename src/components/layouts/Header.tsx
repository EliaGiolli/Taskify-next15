'use client'

import Image from "next/image";
import ManageTicketLayout from "./ManageTicketLayout";
import { IoMdAdd } from "react-icons/io" 

function Header() {
  return (
    <header className="bg-zinc-900 w-full px-5 py-3 my-10 flex flex-col rounded-md ">
        <div className="w-full py-5 flex justify-center items-center gap-x-3">
            <Image src="/logo.jpg" height={50} width={60} alt="Ticketify logo"/>
            <span className="text-3xl md:text-4xl text-violet-400 uppercase">Ticketify</span>
        </div>
        <div className="w-full flex justify-center items-center gap-x-6 p-4">
          <span className="text-lg md:text-2xl border-2 bg-blue-200 border-blue-600 text-black rounded-md p-2 cursor-pointer">Ticket totali: </span>
          <span className="text-lg md:text-2xl border-2 bg-green-200 border-green-400 text-slate-800 rounded-md p-2 cursor-pointer">Ticket completati: </span>
          <span className="text-lg md:text-2xl border-2 bg-red-200 border-red-500 text-black rounded-md p-2 cursor-pointer">Da completare: </span>
          <ManageTicketLayout spanText="aggiungi ticket">
           <IoMdAdd size={30} /> 
          </ ManageTicketLayout>
        </div>
    </header>
  )
}

export default Header