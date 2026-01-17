import { cva } from 'class-variance-authority'

export const navLinkVariants = cva(
  // Base styles that apply to all navigation links
  'flex items-center justify-center px-4 py-2 rounded-md text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
  {
    variants: {
      active: {
        true: 'active text-violet-400 bg-violet-400/20 font-semibold',
        false: 'hover:text-violet-400 hover:bg-violet-400/10',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)
