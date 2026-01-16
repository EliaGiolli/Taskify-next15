import { buttonVariants } from '@/helpers/buttonVariants';
import { ButtonProps } from '@/types/customTypes';
import { cn } from '@/helpers/cn';

function Button({ children, onClick, className, variant, size, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size, className }))} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  )
}

export default Button