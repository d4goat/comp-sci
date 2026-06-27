"use client";
import { useCallback, useState } from "react";

export function useMagnetic(
  element: React.RefObject<HTMLButtonElement | null>,
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMagneticMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!element.current) return;

      const { clientX, clientY } = event;
      const { width, height, left, top } =
        element.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.35;
      const y = (clientY - (top + height / 2)) * 0.35;
      setPosition((prevPosition) => ({ ...prevPosition, x, y }));
    },
    [element],
  );

  const handleMagneticOut = useCallback(() => setPosition({ x: 0, y: 0 }), []);

  return { position, handleMagneticMove, handleMagneticOut };
}
