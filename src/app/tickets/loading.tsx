import { Skeleton } from '@/components/ui/skeleton'

export default function TicketsLoading() {
  return (
    <article className='bg-black border-2 border-violet-400 flex flex-col justify-center items-center text-center rounded-md px-3 py-8'>
      <div className='flex items-center mb-5'>
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-7 w-32 ml-2" />
      </div>
      <div className='px-2 mb-5 w-full space-y-3'>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
      <Skeleton className="h-10 w-24 rounded-md" />
    </article>
  )
}
