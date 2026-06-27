'use client'

import { useLenis } from "@/hooks/useLenis"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const PageWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
    useLenis()
    return (
        <main className={cn('min-h-dvh flex flex-col', className)}>
            {children}
        </main>
    )
}

export { PageWrapper }