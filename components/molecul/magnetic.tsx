'use client'

import { ReactNode, useRef } from "react"
import { motion } from 'framer-motion'
import { useMagnetic } from "@/hooks/useMagnetic"
import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority';

const magneticVariance = cva(
    'relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium ring-offset-background transition-colors before:absolute before:left-[-10%] before:top-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[""] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[""] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-transparent before:bg-transparent after:bg-transparent',
                primary:
                    'bg-primary-bg text-primary-fg before:bg-accent after:bg-accent',
                destructive:
                    'bg-destructive text-primary-foreground before:bg-accent after:bg-accent',
                secondary:
                    'bg-secondary-bg text-secondary-fg before:bg-accent after:bg-accent',
                ghost:
                    'bg-transparent text-text-primary before:bg-accent after:bg-accent',
                outline: 'border border-solid border-border text-text-primary before:bg-accent after:bg-accent',
            },
            size: {
                default: 'p-2 text-sm',
                md: 'px-8 py-10 text-base',
                lg: 'px-8 py-16 text-lg lg:px-12 lg:py-20',
                xl: 'px-10 py-16 text-lg lg:px-14 lg:py-20',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const MagneticItem = ({ children }: { children: ReactNode }) => (
    <span style={{
        position: 'relative',
        zIndex: 1,
        display: 'block',
        width: 'max-content',
        maxWidth: '14ch',
        wordBreak: 'break-all'
    }}>
        {children}
    </span>
)

type MotionButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>

export function MagneticButton({
    children,
    className,
    variant,
    size,
    ...props
}: { children: ReactNode | string, className?: string, variant?: 'default' | 'primary' | 'destructive' | 'secondary' | 'ghost' | 'outline', size?: 'default' | 'md' | 'lg' | 'xl' } & MotionButtonProps) {
    const elementRef = useRef<HTMLButtonElement>(null)
    const { position: { x, y }, handleMagneticMove, handleMagneticOut } = useMagnetic(elementRef)

    return (
        <motion.button
            ref={elementRef}
            className={cn('cursor-pointer', magneticVariance({ variant, size, className }))}
            animate={{ x, y }}
            transition={{
                type: 'spring',
                damping: 15,
                stiffness: 150,
                mass: 0.1
            }}
            onPointerMove={handleMagneticMove}
            onPointerOut={handleMagneticOut}
            whileHover={{ scale: 1.1 }}
            {...props}
        >
            <MagneticItem>{children}</MagneticItem>
        </motion.button>
    )
}