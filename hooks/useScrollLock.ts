"use client";

import { useCallback } from "react";

/**
 * Lock / unlock body scroll.
 * Adds `scroll-locked` class to <body> which is styled in globals.css.
 */
export function useScrollLock() {
  const lock = useCallback(() => {
    document.body.classList.add("scroll-locked");
  }, []);

  const unlock = useCallback(() => {
    document.body.classList.remove("scroll-locked");
  }, []);

  return { lock, unlock };
}
