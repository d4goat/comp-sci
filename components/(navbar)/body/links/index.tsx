'use client';

import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';
import Link from 'next/link';

import { useTranslatedData } from '@/hooks/useTranslatedData';
import { useLocale } from 'next-intl';

/** @type {import('framer-motion').Variants} */
const slideOut = {
    initial: {
        x: 80,
    },
    enter: (i: number) => ({
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
            delay: 0.05 * i,
        },
    }),
    exit: (i: number) => ({
        x: 80,
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
            delay: 0.05 * i,
        },
    }),
};

/** @type {import('framer-motion').Variants} */
const scale = {
    open: {
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        scale: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export function OffcanvasLinks({ onLinkClick }: { onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void }) {
    const locale = useLocale()
    const { NAV_ITEMS } = useTranslatedData();
    const items = NAV_ITEMS.map(({ url, label }, index) => {
        const id = index;
        return (
            <motion.li
                key={id}
                className='relative my-5 md:my-4 flex items-center text-white hover:text-neutral-400 transition-colors duration-200'
                variants={slideOut}
                custom={id}
                initial='initial'
                animate='enter'
                exit='exit'
            >
                <motion.div
                    className='absolute -left-11'
                    variants={scale}
                >
                    <Dot size={36} />
                </motion.div>
                <Link href={url} onClick={(e) => onLinkClick(e, url)} className='text-5xl md:text-6xl capitalize'>
                    {label}
                </Link>
            </motion.li>
        );
    });

    return (
        <div className='mt-20 flex flex-col gap-3'>
            <div className='mb-8 md:mb-5 border-b border-solid'>
                <h5 className='uppercase text-white'>
                    {locale === 'en' ? 'Navigation' : 'Navigasi'}
                </h5>
            </div>
            <ul>{items}</ul>
        </div>
    );
}