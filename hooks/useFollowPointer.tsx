"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function useFollowPointer({
    cursor,
    modal,
    label
}: {
    cursor: React.RefObject<HTMLDivElement | null>;
    modal: React.RefObject<HTMLDivElement | null>;
    label: React.RefObject<HTMLDivElement | null>;
}) {
    const [item, setItem] = useState({ active: false, index: 0 });

    const xMoveModal = useRef<gsap.QuickToFunc | null>(null);
    const yMoveModal = useRef<gsap.QuickToFunc | null>(null);

    const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
    const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);

    const xMoveLabel = useRef<gsap.QuickToFunc | null>(null);
    const yMoveLabel = useRef<gsap.QuickToFunc | null>(null);

    const handlePointerEnter = useCallback(
        (index: number) => setItem({ active: true, index }),
        [],
    );

    const handlePointerLeave = useCallback(
        (index: number) => setItem({ active: false, index }),
        [],
    )

    const moveItems = useCallback((x: number, y: number) => {
        xMoveModal.current?.(x);
        yMoveModal.current?.(y);
        xMoveCursor.current?.(x);
        yMoveCursor.current?.(y);
        xMoveLabel.current?.(x);
        yMoveLabel.current?.(y);
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // move Modal (skip if ref not attached to DOM)
            if (modal?.current) {
                xMoveModal.current = gsap.quickTo(modal.current, 'left', {
                    duration: 0.8,
                    ease: 'power3'
                })
                yMoveModal.current = gsap.quickTo(modal.current, 'top', {
                    duration: 0.8,
                    ease: 'power3'
                })
            }

            // Move Cursor
            if (cursor.current) {
                xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
                    duration: 0.5,
                    ease: 'power3'
                })
                yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
                    duration: 0.5,
                    ease: 'power3'
                })
            }

            // Move Cursor Label
            if (label.current) {
                xMoveLabel.current = gsap.quickTo(label.current, 'left', {
                    duration: 0.45,
                    ease: 'power3'
                })
                yMoveLabel.current = gsap.quickTo(label.current, 'top', {
                    duration: 0.45,
                    ease: 'power3'
                })
            }
        })

        return () => ctx.revert();
    }, [cursor, label, modal])

    return { item, handlePointerEnter, handlePointerLeave, moveItems }
}