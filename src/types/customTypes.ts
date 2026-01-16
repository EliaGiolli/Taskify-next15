import { ButtonHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/helpers/buttonVariants";

export interface ButtonProps 
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>
{
    children?: ReactNode,
    classname?: string,
    onClick?: () => void
}

export interface TicketLayout {
    children: ReactNode,
    spanText: string,
    onAction?: () => void
}