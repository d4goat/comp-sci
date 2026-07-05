'use client'

import { useLenis } from "@/hooks/useLenis"
import { useHashScroll } from "@/hooks/useHashScroll"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"

const PageWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
    useLenis()
    useHashScroll()

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0)
        }
    }, [])

    return (
        <main className={cn('min-h-svh flex flex-col', className)}>
            {children}
        </main>
    )
}

export { PageWrapper }