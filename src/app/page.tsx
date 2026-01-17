import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Ticketify - Home',
  description: 'A modern application that allows you to create and manage tickets',
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-violet-400">
          Welcome to Ticketify
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          A modern application that allows you to create and manage tickets efficiently
        </p>
      </div>

      <Link
        href="/tickets"
        className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
      >
        View All Tickets
        <ArrowRight size={20} />
      </Link>
    </div>
  )
}
