'use client'

import ManageTicketLayout from '../layouts/ManageTicketLayout';
import { MdDelete } from "react-icons/md";

function TicketCard() {
  return (
    <article className='border-2 border-violet-400 flex flex-col justify-center items-center text-center rounded-md p-4'>
        <div>
            <h2>Ticket ID 3</h2>
        </div>
        <div>
            <ul>
                <li>Nome completo</li>
                <li>Numero telefonico</li>
                <li>Brand auto</li>
                <li>commento al ticket</li>
            </ul>
        </div>
        <ManageTicketLayout spanText='cancella ticket'>
            <MdDelete size={30}/>
        </ManageTicketLayout>
    </article>
  )
}

export default TicketCard