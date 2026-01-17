import Image from 'next/image'
import Link from 'next/link'
import Navigation from './Navigation'

function MainHeader() {
  return (
    <header 
      className="bg-black flex flex-col justify-center items-center text-center w-full py-5 mb-10 rounded-md border-b-2 border-violet-400"
      role="banner"
    >
      <Link
        href="/" 
        className="w-full py-5 flex justify-center items-center gap-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-md"
        aria-label="Ticketify homepage"
      >
        <Image 
          src="/logo.jpg" 
          height={50} 
          width={60} 
          alt=""
          aria-hidden="true"
        />
        <span className="text-3xl md:text-4xl text-violet-400 uppercase">
          Ticketify
        </span>
      </Link>

      <Navigation />
    </header>
  )
}

export default MainHeader