'use client'

import { useLenis } from "@/hooks/useLenis"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"

const PageWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
    useLenis()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <main className={cn('min-h-svh flex flex-col', className)}>
            {children}
        </main>
    )
}

export { PageWrapper }