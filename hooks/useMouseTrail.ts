"use client";

import { useEffect, useRef, useCallback } from "react";

export interface TrailConfig {
  /** Maximum number of particles alive at once */
  maxParticles?: number;
  /** Particle spawn interval in ms */
  spawnRate?: number;
  /** How long each particle lives (ms) */
  particleLifespan?: number;
  /** Starting radius of each particle (px) */
  particleRadius?: number;
  /** Spring stiffness — higher = snappier follow (0-1) */
  springStiffness?: number;
  /** Base color for the blob as [r, g, b] (0-255) */
  color?: [number, number, number];
  /**
   * CSS mix-blend-mode applied to the canvas. Use "difference" (default)
   * to get an invert-reveal: whatever color is underneath the blob —
   * white text, black text, anything — flips to its opposite wherever
   * the blob covers it. Set to "normal" to disable and just paint solid.
   */
  blendMode?: React.CSSProperties["mixBlendMode"];
  /** Gaussian blur amount before thresholding — bigger = blobbier, smoother joins */
  blurStdDeviation?: number;
  /** Alpha-matrix slope ("a" in the goo matrix) — higher = sharper, more contrasty edges */
  thresholdSlope?: number;
  /** Alpha-matrix intercept ("b" in the goo matrix) — shifts how eagerly nearby blobs fuse */
  thresholdIntercept?: number;
  /** Draw a small highlight dot at the live cursor position, like in the reference image */
  showCursorDot?: boolean;
  /** Radius of that highlight dot */
  cursorDotRadius?: number;
  /** Hide the whole trail (fade out) once the cursor has stopped moving for idleTimeout ms */
  hideOnIdle?: boolean;
  /** How long the cursor must stay still before the trail hides (ms) */
  idleTimeout?: number;
  /** Fade duration for the hide/show transition (ms) */
  idleFadeDuration?: number;
}

interface Particle {
  x: number;
  y: number;
  birthTime: number;
  radius: number;
}

const DEFAULT_CONFIG: Required<TrailConfig> = {
  maxParticles: 40,
  spawnRate: 12,
  particleLifespan: 2000,
  particleRadius: 60,
  springStiffness: 0.18,
  // White + mix-blend-mode "difference" (set below) is what makes the
  // invert-reveal work: difference(255, anything) = 255 - anything, which
  // flips black <-> white symmetrically wherever the blob passes.
  color: [255, 255, 255],
  blendMode: "difference",
  blurStdDeviation: 14,
  thresholdSlope: 22,
  thresholdIntercept: -5,
  showCursorDot: true,
  cursorDotRadius: 7,
  hideOnIdle: true,
  idleTimeout: 1000,
  idleFadeDuration: 400,
};

const FILTER_ID = "mouse-trail-goo-filter";

/**
 * Injects (or updates) the hidden SVG filter that turns a cluster of
 * solid circles into one fused, liquid-looking blob.
 *
 * How it works:
 * 1. feGaussianBlur softens every circle's edge.
 * 2. feColorMatrix rewrites the alpha channel with `newAlpha = slope*alpha + intercept`.
 *    Because slope is large, any pixel that was even partially covered by
 *    the blur gets pushed to fully opaque, while empty space gets pushed
 *    to fully transparent — the soft blur "snaps" back into a hard edge,
 *    but now overlapping circles read as one continuous shape instead of
 *    separate dots. This is the standard "gooey cursor" trick.
 */
function ensureGooFilter(
  stdDeviation: number,
  slope: number,
  intercept: number,
) {
  let svg = document.getElementById(`${FILTER_ID}-svg`) as SVGSVGElement | null;

  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", `${FILTER_ID}-svg`);
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";
    svg.innerHTML = `
      <defs>
        <filter id="${FILTER_ID}">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${stdDeviation}" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 ${slope} ${intercept}" />
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
  } else {
    svg
      .querySelector("feGaussianBlur")
      ?.setAttribute("stdDeviation", String(stdDeviation));
    svg
      .querySelector("feColorMatrix")
      ?.setAttribute(
        "values",
        `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${slope} ${intercept}`,
      );
  }
}

/**
 * useMouseTrail — renders a liquid, metaball-style trail that follows the
 * cursor and inverts the color of anything it passes over (white text
 * becomes black, black text/background becomes white, automatically —
 * no separate logic needed for each direction).
 *
 * Usage:
 *   const canvasRef = useRef<HTMLCanvasElement>(null);
 *   useMouseTrail(canvasRef);
 *   return (
 *     <canvas
 *       ref={canvasRef}
 *       style={{
 *         position: "fixed",
 *         top: 0,
 *         left: 0,
 *         width: "100vw",
 *         height: "100vh",
 *         pointerEvents: "none",
 *         zIndex: 9999,
 *       }}
 *     />
 *   );
 *
 * Important for the invert effect to actually show:
 * - Do NOT give the canvas (or any wrapper around it) its own background
 *   color — it must stay visually transparent outside the blob, since
 *   mix-blend-mode only does anything where the canvas has painted pixels.
 * - The canvas and the text/elements you want inverted must share the
 *   same stacking context — an ancestor with `isolation: isolate`,
 *   `opacity < 1`, `transform`, or `filter` between them will sandbox the
 *   blend mode and the invert will silently stop working.
 * - Don't disable blendMode for this effect — set it to "normal" only if
 *   you want a plain solid blob with no color inversion.
 *
 * Tuning tips:
 * - Bigger, blobbier shape: raise particleRadius and blurStdDeviation.
 * - Longer wavy tail (like the screenshot): lower springStiffness (0.1–0.15)
 *   and raise particleLifespan / maxParticles.
 * - Sharper vs. softer edge: raise/lower thresholdSlope.
 * - The trail auto-hides (fades to opacity 0) after `idleTimeout` ms
 *   (default 3000) of no mouse movement, and fades back in the instant
 *   the cursor moves again. Set hideOnIdle: false to disable this.
 */
export function useMouseTrail(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config?: TrailConfig,
) {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const lastMoveRef = useRef(0);
  const isIdleRef = useRef(false);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const configRef = useRef(cfg);
  configRef.current = cfg;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    isActiveRef.current = true;
    lastMoveRef.current = performance.now();
  }, []);

  const handleMouseLeave = useCallback(() => {
    isActiveRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ensureGooFilter(
      cfg.blurStdDeviation,
      cfg.thresholdSlope,
      cfg.thresholdIntercept,
    );
    // This single line is what turns separate circles into one fused blob.
    canvas.style.filter = `url(#${FILTER_ID})`;
    // This is what makes the blob invert colors of whatever it passes over
    // (white <-> black, both directions) instead of just opaquely covering it.
    canvas.style.mixBlendMode = cfg.blendMode;
    // Smooth fade for the idle hide/show transition below.
    canvas.style.transition = `opacity ${cfg.idleFadeDuration}ms ease`;
    canvas.style.opacity = "1";
    lastMoveRef.current = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    smoothRef.current.x = mouseRef.current.x;
    smoothRef.current.y = mouseRef.current.y;

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const c = configRef.current;
      const particles = particlesRef.current;
      const smooth = smoothRef.current;
      const mouse = mouseRef.current;

      smooth.x += (mouse.x - smooth.x) * c.springStiffness;
      smooth.y += (mouse.y - smooth.y) * c.springStiffness;

      // Idle detection: if the cursor hasn't moved for `idleTimeout` ms,
      // fade the whole trail out and stop spawning new particles. Moving
      // the mouse again (handleMouseMove) instantly resets the idle clock.
      const idleFor = now - lastMoveRef.current;
      const idle = c.hideOnIdle && idleFor > c.idleTimeout;
      if (idle !== isIdleRef.current) {
        isIdleRef.current = idle;
        canvas.style.opacity = idle ? "0" : "1";
      }

      if (
        !idle &&
        isActiveRef.current &&
        now - lastSpawnRef.current > c.spawnRate
      ) {
        lastSpawnRef.current = now;
        if (particles.length < c.maxParticles) {
          particles.push({
            x: smooth.x,
            y: smooth.y,
            birthTime: now,
            radius: c.particleRadius,
          });
        } else {
          const oldest = particles.shift()!;
          oldest.x = smooth.x;
          oldest.y = smooth.y;
          oldest.birthTime = now;
          oldest.radius = c.particleRadius;
          particles.push(oldest);
        }
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const [r, g, b] = c.color;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      // Draw at FULL opacity and shrink only the radius over the particle's
      // life. Fading alpha (like the previous version did) defeats the goo
      // filter — partially transparent circles blur into a soft haze
      // instead of a crisp fused shape.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.birthTime;
        const life = age / c.particleLifespan;

        if (life >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const easedLife = 1 - Math.pow(1 - life, 3);
        const currentRadius = p.radius * (1 - easedLife);

        if (currentRadius < 0.5) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small highlight "eye" inside the blob, matching the reference
      // screenshot — punched out with destination-out so the page
      // background shows through at the live cursor position.
      if (c.showCursorDot && isActiveRef.current) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, c.cursorDotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      particlesRef.current = [];
      canvas.style.filter = "";
      canvas.style.mixBlendMode = "";
      canvas.style.opacity = "";
      canvas.style.transition = "";
    };
  }, [canvasRef, handleMouseMove, handleMouseLeave]);
}
