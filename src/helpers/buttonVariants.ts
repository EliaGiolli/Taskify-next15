import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles that apply to all buttons
  'rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // For primary actions (add ticket, etc.)
        action: 'bg-violet-500 hover:bg-violet-600 text-white flex justify-center items-center text-center gap-2',
        
        // For form submissions
        submit: 'bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:opacity-50 text-white',
        
        // For destructive actions (delete, etc.)
        danger: 'bg-red-500 hover:bg-red-600 text-white flex justify-center items-center text-center gap-2',

        // For outline/secondary actions (mark as completed, etc.)
        outline: 'bg-transparent border-2 border-violet-400 text-zinc-200 hover:bg-violet-400/10 hover:text-violet-400 flex justify-center items-center gap-2'
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'action',
      size: 'md',
    },
  }
);