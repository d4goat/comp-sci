"use client";

import { useEffect } from "react";

/**
 * Menangani smooth scroll ke section setelah navigasi lintas halaman.
 *
 * Cara kerja:
 * 1. Navbar mengarahkan ke /?scroll=about (menghindari lompat instan browser)
 * 2. Hook ini membaca query parameter 'scroll' saat mount
 * 3. Polling aktif hingga Lenis siap di window.lenis
 * 4. Scroll ke target element menggunakan Lenis
 */
export function useHashScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let attempts = 0;
    const MAX_ATTEMPTS = 80; // max ~4 detik (80 * 50ms)
    let timerId: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      attempts++;

      const urlParams = new URLSearchParams(window.location.search);
      const scrollParam = urlParams.get("scroll");
      const hash = scrollParam ? `#${scrollParam}` : window.location.hash;

      if (!hash) {
        if (attempts < MAX_ATTEMPTS) {
          timerId = setTimeout(tryScroll, 50);
        }
        return;
      }

      const target = document.querySelector(hash);
      const lenis = (window as any).lenis;

      if (lenis && target) {
        if (scrollParam) {
          const newUrl = window.location.pathname + `#${scrollParam}`;
          window.history.replaceState(null, "", newUrl);
        }
        timerId = setTimeout(() => {
          lenis.start();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              lenis.scrollTo(target, { duration: 1.4, immediate: false });
            });
          });
        }, 800);
        return;
      }

      if (!lenis && target && attempts >= MAX_ATTEMPTS) {
        if (scrollParam) {
          const newUrl = window.location.pathname + `#${scrollParam}`;
          window.history.replaceState(null, "", newUrl);
        }
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (attempts < MAX_ATTEMPTS) {
        timerId = setTimeout(tryScroll, 50);
      }
    };

    timerId = setTimeout(tryScroll, 100);

    return () => clearTimeout(timerId);
  }, []);
}
