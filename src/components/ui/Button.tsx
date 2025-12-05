import React from 'react'
import { ButtonProps } from '@/types/customTypes'

function Button({children, onClick, classname, ...props}: ButtonProps) {
  return (
    <button className={classname} onClick={onClick} {...props}>
        {children}
    </button>
  )
}

export default Button