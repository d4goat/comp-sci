'use client'
import React, { useRef, forwardRef, useImperativeHandle } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(SplitText, ScrollTrigger)

export type CopyRef = {
    play: () => void
}

type TriggerMode = 'scroll' | 'immediate' | 'manual'

type CopyProps = {
    children: React.ReactNode
    triggerMode?: TriggerMode
    delay?: number
    blockColor?: string
    stagger?: number
    duration?: number
    revealerWidth?: string
    revealerHeight?: string
    left?: string
}

const Copy = forwardRef<CopyRef, CopyProps>(({
    children,
    triggerMode = 'scroll',
    delay = 0,
    blockColor = "#000",
    stagger = 0.15,
    duration = 0.75,
    revealerWidth,
    revealerHeight,
    left
}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const splitRef = useRef<SplitText[]>([])
    const linesRef = useRef<HTMLDivElement[]>([])
    const blocks = useRef<HTMLDivElement[]>([])
    const timelinesRef = useRef<gsap.core.Timeline[]>([])

    useImperativeHandle(ref, () => ({
        play: () => {
            timelinesRef.current.forEach((tl) => tl.play())
        }
    }))

    useGSAP(() => {
        if (!containerRef.current) return;

        splitRef.current = []
        linesRef.current = []
        blocks.current = []
        timelinesRef.current = []

        let elements: Element[] = []
        if (containerRef.current.hasAttribute('data-copy-wrapper')) {
            elements = Array.from(containerRef.current.children)
        } else {
            elements = [containerRef.current]
        }

        elements.forEach((element) => {
            const split = SplitText.create(element, {
                type: 'lines',
                linesClass: 'block-line++',
                lineThreshold: 0.1
            });
            splitRef.current.push(split)
            split.lines.forEach((line) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'block-line-wrapper';
                line.parentNode?.insertBefore(wrapper, line);
                wrapper.appendChild(line);
                const block = document.createElement('div');
                block.className = 'block-revealer';
                block.style.backgroundColor = blockColor;
                if (revealerWidth) {
                    block.style.setProperty('width', revealerWidth);
                }
                if (revealerWidth) {
                    block.style.setProperty('width', revealerWidth);
                }
                if (left) {
                    block.style.setProperty('left', left);
                }
                wrapper.appendChild(block);
                linesRef.current.push(line as HTMLDivElement);
                blocks.current.push(block);
            })
        })

        gsap.set(linesRef.current, { opacity: 0 })
        gsap.set(blocks.current, { scaleX: 0, transformOrigin: 'left center' })

        linesRef.current.forEach((line) => {
            const highlightEls = line.querySelectorAll('.highlight-bg')
            gsap.set(highlightEls, { scaleX: 0, transformOrigin: 'left center' })
        })

        const createBlockRevealAnimation = ({ block, line, index }: { block: Element, line: Element, index: number }) => {
            const tl = gsap.timeline({ delay: delay + index * stagger });
            const highlightEls = line.querySelectorAll('.highlight-bg')

            tl.to(block, { scaleX: 1, duration: duration, ease: 'power4.inOut' })
            tl.set(line, { opacity: 1 })
            tl.set(block, { transformOrigin: 'right center' })
            tl.to(block, { scaleX: 0, duration: duration, ease: 'power4.inOut' })

            if (highlightEls.length > 0) {
                tl.to(highlightEls, {
                    scaleX: 1,
                    duration: duration,
                    ease: 'power4.inOut'
                }, "<") // "<" = mulai bersamaan dengan tween sebelumnya
            }

            return tl
        }

        if (triggerMode === 'scroll') {
            blocks.current.forEach((block, index) => {
                const tl = createBlockRevealAnimation({ block, line: linesRef.current[index], index });
                tl.pause()
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top 90%',
                    once: true,
                    onEnter: () => tl.play()
                })
            })
        } else if (triggerMode === 'manual') {
            blocks.current.forEach((block, index) => {
                const tl = createBlockRevealAnimation({ block, line: linesRef.current[index], index });
                tl.pause()
                timelinesRef.current.push(tl)
            })
        } else {
            blocks.current.forEach((block, index) => {
                createBlockRevealAnimation({ block, line: linesRef.current[index], index })
            })
        }
    }, {
        scope: containerRef,
        dependencies: [triggerMode, delay, blockColor, stagger, duration, revealerHeight, revealerWidth, left]
    })

    return <div ref={containerRef} data-copy-wrapper='true'>{children}</div>
})

Copy.displayName = 'Copy'

export default Copy