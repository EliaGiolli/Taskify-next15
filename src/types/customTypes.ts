import { ReactNode } from "react";

export interface ButtonProps {
    children?: ReactNode,
    classname?: string,
    onClick?: () => void
}

export interface TicketLayout {
    children: ReactNode,
    spanText: string,
    onAction?: () => void
}