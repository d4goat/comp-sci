'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionRouter } from "next-transition-router"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslatedData } from "@/hooks/useTranslatedData"
import { OffCanvasBody } from "./body"
import { OffcanvasToggle } from "./toggle"
import { useScrollLock } from "@/hooks/useScrollLock"
import { Dot } from "lucide-react"

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]

const Navbar = () => {
    const { NAV_ITEMS } = useTranslatedData();
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const { lock, unlock } = useScrollLock();
    const router = useTransitionRouter();
    const pathname = usePathname();
    const menuOpenRef = useRef(menuOpen);
    useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

    const smoothScrollToElement = (el: Element) => {
        const lenis = (window as any).lenis;
        if (lenis) {
            lenis.start();
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    lenis.scrollTo(el, { duration: 1.2 });
                });
            });
        } else {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        const isHashLink = url.startsWith('/#') || url.startsWith('#');
        if (!isHashLink) return;

        e.preventDefault();

        const hash = url.substring(url.indexOf('#'));
        const isOnHomePage = pathname === '/';

        if (isOnHomePage) {
            const target = document.querySelector(hash);
            if (!target) return;

            history.replaceState(null, '', hash);

            if (menuOpenRef.current) {
                unlock();
                setMenuOpen(false);
                setTimeout(() => smoothScrollToElement(target), 820);
            } else {
                smoothScrollToElement(target);
            }
        } else {
            if (menuOpenRef.current) {
                unlock();
                setMenuOpen(false);
            }
            router.push(`/?scroll=${hash.substring(1)}`);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            lock()
        } else {
            unlock()
        }
        return () => unlock()
    }, [menuOpen, lock, unlock])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                className={`z-50 items-center justify-between px-8 lg:px-12 py-5 transition-all duration-300 absolute top-0 right-0 w-full ${scrolled ? "hidden" : "md:flex hidden"
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: ease, delay: 0.2 }}
            >
                <motion.a href="/" className="text-sm font-medium tracking-[0.2em] uppercase text-white" whileHover={{ opacity: 0.7 }}>
                    Loreast
                </motion.a>
                <ul className="flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <motion.li key={item.id} whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                            <Link href={item.url} onClick={(e) => handleLinkClick(e, item.url)}>
                                <span className="text-sm font-medium tracking-[0.2em] uppercase text-white">{item.label}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>

            </motion.nav>
            <motion.nav className={`${scrolled || menuOpen ? 'hidden' : 'flex md:hidden'} z-50 items-center justify-between px-8 lg:px-12 py-7 transition-all duration-300 absolute top-0 right-0 w-full`}>
                <motion.a href="/" className="text-sm font-medium tracking-[0.2em] uppercase text-white" whileHover={{ opacity: 0.7 }}>
                    Loreast
                </motion.a>
                <motion.button onClick={() => setMenuOpen(!menuOpen)} whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }} className="flex items-center text-white">
                    <Dot />
                    Menu
                </motion.button>
            </motion.nav>
            <AnimatePresence mode="wait">
                {menuOpen ? <OffCanvasBody onLinkClick={handleLinkClick} /> : null}
            </AnimatePresence>
            <OffcanvasToggle handleOpen={setMenuOpen} isOpen={menuOpen} />
        </>
    )
}

export { Navbar }