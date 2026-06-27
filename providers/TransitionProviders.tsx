'use client'
import { type ReactNode, useEffect, useRef } from "react"
import { TransitionRouter } from "next-transition-router"
import gsap from "gsap";

const ROWS = 4;
const COLS = 16;

export default function TransitionProviders({ children }: { children: ReactNode }) {
    const transitionGridRef = useRef<HTMLDivElement>(null)
    const blockRef = useRef<HTMLDivElement[]>([])

    const createTransitionGrid = () => {
        if (!transitionGridRef.current) return;

        const container = transitionGridRef.current;

        //clearing previous grid
        container.innerHTML = ''
        blockRef.current = []

        const blockWidth = window.innerWidth / COLS
        const blockHeight = window.innerHeight / ROWS

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const block = document.createElement('div')
                block.className = "transition-block"
                block.style.cssText = `
                    width: ${blockWidth + 1}px;
                    height: ${blockHeight + 1}px;
                    top: ${row * blockHeight + 1}px;
                    left: ${col * blockWidth + 1}px;
                    transform-origin: ${row % 2 === 0 ? 'left' : 'right'} center;
                `

                container.appendChild(block)
                blockRef.current.push(block)
            }
        }

        gsap.set(blockRef.current, { scaleX: 0 })
    }

    useEffect(() => {
        createTransitionGrid()
        window.addEventListener('resize', createTransitionGrid)
        return () => window.removeEventListener('resize', createTransitionGrid)
    }, [])

    const getRowBlocks = (row: number) => blockRef.current.slice(row * COLS, row * COLS + COLS)

    const animateIn = (onComplete: () => void) => {
        const tl = gsap.timeline({ onComplete })

        Array.from({ length: 4 }).forEach((_, row) => {
            const blocks = getRowBlocks(row);

            tl.to(blocks, {
                scaleX: 1, duration: 0.6, ease: 'power3.inOut', stagger: { each: 0.025, from: row % 2 === 0 ? 'start' : 'end' }
            }, "<")
        })

        return tl
    }

    const animateOut = (onComplete: () => void) => {
        const tl = gsap.timeline({ onComplete })

        Array.from({ length: 4 }).forEach((_, row) => {
            const blocks = getRowBlocks(row)
            tl.to(blocks, {
                scaleX: 0, duration: 0.6, ease: 'power3.inOut', stagger: { each: 0.025, from: row % 2 === 0 ? 'start' : 'end' }
            }, '<')
        })

        return tl
    }

    return <TransitionRouter
        auto
        leave={(next) => {
            const tl = animateIn(next)
            return () => tl.kill()
        }}
        enter={(next) => {
            const tl = animateOut(next)
            return () => tl.kill()
        }}
    >
        <div ref={transitionGridRef} className="transition-grid" />
        {children}
    </TransitionRouter>
}