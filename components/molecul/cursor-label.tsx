'use client'

import { ForwardedRef, forwardRef, PropsWithChildren } from "react"
import { HTMLMotionProps, Variants, motion } from 'framer-motion'

const MotionComponent = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>((props, ref) => (
    <motion.div
        ref={ref}
        {...props}
        className={`flex justify-center items-center w-20 h-20 rounded-full fixed z-10 pointer-events-none ${props.className || 'bg-accent'}`}
    />
))
MotionComponent.displayName = 'MotionComponent'

export const CursorCircle = forwardRef(
    function CursorCircle({ variants, active, ...props }: { variants: Variants, active: boolean }, ref: ForwardedRef<HTMLDivElement>) {
        return (
            <MotionComponent
                ref={ref}
                className='bg-primary-bg'
                variants={variants}
                initial='initial'
                animate={active ? 'enter' : 'closed'}
                {...props}
            />
        )
    }
)

export const CursorLabel = forwardRef(
    function CursorLabel({ variants, active, ...props }: PropsWithChildren<{ variants: Variants, active: boolean }>, ref: ForwardedRef<HTMLDivElement>) {
        return (
            <MotionComponent
                ref={ref}
                className='bg-primary-bg text-lg font-heading'
                variants={variants}
                initial='initial'
                animate={active ? 'enter' : 'closed'}
                {...props}
            />
        )
    }
)