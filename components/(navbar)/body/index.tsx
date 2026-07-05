'use client'

import { motion } from 'framer-motion'

import { OffcanvasBackdrop } from './backdrop';
import { OffcanvasLinks } from './links';
import { Footer } from '@/components/landing-page/footer';
import { useLocale } from 'next-intl';

const slideLeft = {
    initial: {
        x: 'calc(100% + 100px)',
    },
    enter: {
        x: '0',
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
    exit: {
        x: 'calc(100% + 100px)',
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
};

function LanguageSwitcher() {
    const locale = useLocale();

    const handleLocaleChange = (newLocale: string) => {
        if (newLocale === locale) return;
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        window.location.reload();
    };

    return (
        <div className="flex items-center gap-4 mt-6">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">{locale === 'en' ? "Language" : "Bahasa"}:</span>
            <div className="relative flex items-center bg-neutral-900/60 border border-neutral-800 rounded-full p-1 w-32 justify-between">
                {/* Active Indicator Slide */}
                <motion.div
                    className="absolute bg-white rounded-full h-7 w-[58px]"
                    initial={false}
                    animate={{
                        x: locale === 'en' ? 62 : 2
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                    onClick={() => handleLocaleChange('id')}
                    className={`relative z-10 text-xs font-semibold uppercase cursor-pointer tracking-wider py-1 px-3 w-14 transition-colors duration-300 ${locale === 'id' ? 'text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                    ID
                </button>
                <button
                    onClick={() => handleLocaleChange('en')}
                    className={`relative z-10 text-xs font-semibold uppercase cursor-pointer tracking-wider py-1 px-3 w-14 transition-colors duration-300 ${locale === 'en' ? 'text-black' : 'text-neutral-400 hover:text-white'}`}
                >
                    EN
                </button>
            </div>
        </div>
    );
}

export function OffCanvasBody({ onLinkClick }: { onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void }) {
    return (
        <motion.div
            className='fixed right-0 top-0 h-screen w-full sm:w-[600px] bg-text z-40'
            variants={slideLeft}
            initial='initial'
            animate='enter'
            exit={'exit'}
        >
            <OffcanvasBackdrop />
            <div className="h-full flex flex-col justify-between p-14 md:p-20">
                <OffcanvasLinks onLinkClick={onLinkClick} />
                <div className="flex flex-col items-center gap-6">
                    <LanguageSwitcher />
                    <Footer />
                </div>
            </div>
        </motion.div>
    )
}